import * as serverbound_location_v1 from './packets/serverbound/v1/location'
import * as serverbound_party_info_v1 from './packets/serverbound/v1/party_info'
import * as serverbound_ping_v1 from './packets/serverbound/v1/ping'
import * as serverbound_player_info_v1 from './packets/serverbound/v1/player_info'

import * as clientbound_location_v1 from './packets/clientbound/v1/location'
import * as clientbound_party_info_v1 from './packets/clientbound/v1/party_info'
import * as clientbound_ping_v1 from './packets/clientbound/v1/ping'
import * as clientbound_player_info_v1 from './packets/clientbound/v1/player_info'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'
import { PacketError, getPacketErrorFromId, packetErrorToId } from './enums'

export interface VersionedPacket {
    version: number
}

export interface FailedPacket {
    error: PacketError
}

export interface PacketUtils<T> {
    read(buffer: Buffer): T
    write(packet: T): Buffer
}

export * from './enums'

export const serverboundPackets: Record<number, Record<string, PacketUtils<VersionedPacket>>> = {
    1: {
        location: serverbound_location_v1,
        party_info: serverbound_party_info_v1,
        ping: serverbound_ping_v1,
        player_info: serverbound_player_info_v1
    }
}

export const clientboundPackets: Record<number, Record<string, PacketUtils<VersionedPacket>>> = {
    1: {
        location: clientbound_location_v1,
        party_info: clientbound_party_info_v1,
        ping: clientbound_ping_v1,
        player_info: clientbound_player_info_v1
    }
}

export function readClientboundPacket<T extends VersionedPacket>(name: string, buffer: Buffer): T | FailedPacket {
    const success = buffer[0] === 1
    const reader = new PacketReader(buffer.subarray(1))
    const varint = reader.id
    // If the packet was not successful, return an error instead of reading
    if (!success) return { error: getPacketErrorFromId(varint) } as FailedPacket
    return clientboundPackets[varint][name].read(buffer.subarray(1)) as T
}

export function writeClientboundPacket<T extends VersionedPacket>(name: string, packet: T): Buffer {
    const buffer = clientboundPackets[packet.version][name].write(packet)
    // Add a success byte to the start of the buffer
    const newBuffer = Buffer.alloc(buffer.length + 1)
    newBuffer[0] = 1
    newBuffer.set(buffer, 1)
    return newBuffer
}

export function writeClientboundError(error: PacketError): Buffer {
    const writer = new PacketWriter(packetErrorToId(error))
    const buffer = Buffer.alloc(writer.buffer.length + 1)
    buffer[0] = 0
    buffer.set(writer.buffer, 1)
    return buffer
}

export function readServerboundPacket<T extends VersionedPacket>(name: string, buffer: Buffer): T {
    const reader = new PacketReader(buffer)
    const version = reader.id
    return serverboundPackets[version][name].read(buffer) as T
}

export function writeServerboundPacket<T extends VersionedPacket>(name: string, packet: T): Buffer {
    return serverboundPackets[packet.version][name].write(packet)
}