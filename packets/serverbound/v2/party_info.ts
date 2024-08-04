import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const CURRENT_VERSION = 2

/**
 * Represents a serverbound party info packet.
 * These are empty since they are only used to request a packet from the server.
 */
export interface ServerboundPartyInfoPacketV1 extends VersionedPacket {}

/**
 * Reads a clientbound party info packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ServerboundPartyInfoPacketV1 {
    const reader = new PacketReader(buffer)
    return { version: reader.id }
}

/**
 * Writes a new serverbound party info packet to a new buffer. The server will return either an error or a successful party info packet.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data.
 */
export function write(): Buffer {
    return new PacketWriter(CURRENT_VERSION).buffer
}