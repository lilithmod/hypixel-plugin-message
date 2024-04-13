import { VersionedPacket } from '../../../mod'
import { Client, PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'
import { Environment, environmentToId, getEnvironmentFromId } from '../../../enums'

const CURRENT_VERSION = 1

export interface ClientboundLocationPacketV1 extends VersionedPacket {
    environment: Environment
    proxyName: string
    serverName: string
    serverType?: string
    lobbyName?: string
    mode?: string
    map?: string
}

export function read(buffer: Buffer): ClientboundLocationPacketV1 {
    const reader = new PacketReader(buffer)

    const packet: ClientboundLocationPacketV1 = {
        version: reader.id,
        environment: getEnvironmentFromId(reader.readVarInt()),
        proxyName: reader.readString(),
        serverName: reader.readString(),
        serverType: reader.readOptional(reader.readString.bind(reader)),
        lobbyName: reader.readOptional(reader.readString.bind(reader)),
        mode: reader.readOptional(reader.readString.bind(reader)),
        map: reader.readOptional(reader.readString.bind(reader))
    }

    if (packet.serverType === undefined) delete packet.serverType
    if (packet.lobbyName === undefined) delete packet.lobbyName
    if (packet.mode === undefined) delete packet.mode
    if (packet.map === undefined) delete packet.map

    return packet
}

export function write(packet: ClientboundLocationPacketV1): Buffer {
    const writer = new PacketWriter(CURRENT_VERSION)

    writer
        .writeVarInt(environmentToId(packet.environment))
        .writeString(packet.proxyName)
        .writeString(packet.serverName)
        .writeOptional(packet.serverType, writer.writeString.bind(writer))
        .writeOptional(packet.lobbyName, writer.writeString.bind(writer))
        .writeOptional(packet.mode, writer.writeString.bind(writer))
        .writeOptional(packet.map, writer.writeString.bind(writer))

    return writer.buffer
}