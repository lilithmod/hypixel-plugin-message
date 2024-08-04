import * as serverbound_register_v1 from './packets/serverbound/v1/register'
import * as serverbound_party_info_v2 from './packets/serverbound/v2/party_info'
import * as serverbound_ping_v1 from './packets/serverbound/v1/ping'
import * as serverbound_player_info_v1 from './packets/serverbound/v1/player_info'

import * as clientbound_location_v1 from './packets/clientbound/v1/event/location'
import * as clientbound_hello_v1 from './packets/clientbound/v1/hello'
import * as clientbound_party_info_v2 from './packets/clientbound/v2/party_info'
import * as clientbound_ping_v1 from './packets/clientbound/v1/ping'
import * as clientbound_player_info_v1 from './packets/clientbound/v1/player_info'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'
import { PacketError, PacketErrorId, getPacketErrorFromId, packetErrorToId } from './enums'

/**
 * The base packet interface implemented by all packets.
 * The version number is used to version the API on a per-packet basis.
 */
export interface VersionedPacket {
    version: number
}

/**
 * Represents a failed packet, which is returned when a packet is not successful.
 * The numeric id is automatically converted to a string representation.
 */
export interface FailedPacket {
    error: PacketError
}

/**
 * Represents a packet utility, which reads and writes packets from a buffer.
 */
export interface PacketUtils<T> {
    read(buffer: Buffer): T
    write(packet: T): Buffer
}

export * from './enums'

/**
 * A record of all serverbound packets, indexed by version number.
 */
export const serverboundPackets: Record<number, Record<string, PacketUtils<VersionedPacket>>> = {
    1: {
        register: serverbound_register_v1,
        ping: serverbound_ping_v1,
        player_info: serverbound_player_info_v1
    },
    2: {
        party_info: serverbound_party_info_v2
    }
}

/**
 * A record of all clientbound packets, indexed by version number.
 * Using `readClientboundPacket` and `writeClientboundPacket` is recommended for reading and writing packets, especially for success byte and error handling in clientbound packets.
 */
export const clientboundPackets: Record<number, Record<string, PacketUtils<VersionedPacket>>> = {
    1: {
        location: clientbound_location_v1,
        ping: clientbound_ping_v1,
        player_info: clientbound_player_info_v1
    },
    2: {
        party_info: clientbound_party_info_v2,
    }
}

/**
 * Reads a clientbound packet from a buffer.
 * @param name This should be the plugin message name, minus the `hypixel:` prefix.
 * @param buffer A buffer containing the entire packet data from the plugin message. The success byte should be the first entry in the buffer.
 * @returns The packet read from the buffer, or a failed packet with an error if the packet was not successful.
 */
export function readClientboundPacket<T extends VersionedPacket>(name: string, buffer: Buffer): T | FailedPacket {
    const success = buffer[0] === 1
    const reader = new PacketReader(buffer.subarray(1))
    const varint = reader.id
    // If the packet was not successful, return an error instead of reading
    if (!success) return { error: getPacketErrorFromId(varint) } as FailedPacket
    return clientboundPackets[varint][name].read(buffer.subarray(1)) as T
}

/** Writes a clientbound packet to a buffer, assuming a true success byte.
 * @param name This should be the plugin message name, minus the `hypixel:` prefix.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data.
 */
export function writeClientboundPacket<T extends VersionedPacket>(name: string, packet: T): Buffer {
    const buffer = clientboundPackets[packet.version][name].write(packet)
    // Add a success byte to the start of the buffer
    const newBuffer = Buffer.alloc(buffer.length + 1)
    newBuffer[0] = 1
    newBuffer.set(buffer, 1)
    return newBuffer
}

/**
 * Writes an unsuccessful clientbound packet to a buffer.
 * @param error The error message to write.
 * @returns 
 */
export function writeClientboundError(error: PacketError | PacketErrorId): Buffer {
    const writer = new PacketWriter(typeof error === 'number' ? error : packetErrorToId(error))
    const buffer = Buffer.alloc(writer.buffer.length + 1)
    buffer[0] = 0
    buffer.set(writer.buffer, 1)
    return buffer
}

/**
 * Reads a serverbound packet from a buffer.
 * @param name This should be the plugin message name, minus the `hypixel:` prefix.
 * @param buffer A buffer containing the entire packet data from the plugin message. The version number should be the first entry in the buffer.
 * @returns The packet read from the buffer.
 */
export function readServerboundPacket<T extends VersionedPacket>(name: string, buffer: Buffer): T {
    const reader = new PacketReader(buffer)
    const version = reader.id
    return serverboundPackets[version][name].read(buffer) as T
}

/**
 * Writes a serverbound packet to a buffer.
 * @param name This should be the plugin message name, minus the `hypixel:` prefix.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data.
 */
export function writeServerboundPacket<T extends VersionedPacket>(name: string, packet: T): Buffer {
    return serverboundPackets[packet.version][name].write(packet)
}