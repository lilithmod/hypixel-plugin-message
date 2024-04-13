import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const CURRENT_VERSION = 1

export interface ClientboundPingPacketV1 extends VersionedPacket {
    response: string
}

/**
 * Reads a clientbound ping packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ClientboundPingPacketV1 {
    const reader = new PacketReader(buffer)
    return {
        version: reader.id,
        response: reader.readString()
    }
}

/**
 * Writes a clientbound ping packet to a new buffer.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data. A success byte should be written to the buffer before this data.
 */
export function write(packet: ClientboundPingPacketV1): Buffer {
    return new PacketWriter(CURRENT_VERSION).writeString(packet.response).buffer
}