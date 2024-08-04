import { VersionedPacket } from '../../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'
import { Environment, environmentToId, getEnvironmentFromId } from '../../../../enums'

const CURRENT_VERSION = 1

/**
 * Sent by the server in response to a clientbound location packet to inform the client of its current location.
 * Similar to /locraw, and based on the same data.
 */
export interface ClientboundLocationPacketV1 extends VersionedPacket {
    serverName: string
    serverType?: string
    lobbyName?: string
    mode?: string
    map?: string
}

/**
 * Reads a clientbound location packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ClientboundLocationPacketV1 {
    const reader = new PacketReader(buffer)

    const packet: ClientboundLocationPacketV1 = {
        version: reader.id,
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

/**
 * Writes a clientbound location packet to a new buffer.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data. A success byte should be written to the buffer before this data.
 */
export function write(packet: ClientboundLocationPacketV1): Buffer {
    const writer = new PacketWriter(CURRENT_VERSION)

    writer
        .writeString(packet.serverName)
        .writeOptional(packet.serverType, writer.writeString.bind(writer))
        .writeOptional(packet.lobbyName, writer.writeString.bind(writer))
        .writeOptional(packet.mode, writer.writeString.bind(writer))
        .writeOptional(packet.map, writer.writeString.bind(writer))

    return writer.buffer
}