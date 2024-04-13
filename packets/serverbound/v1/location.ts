import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const CURRENT_VERSION = 1

/**
 * Represents a serverbound location packet.
 * These are empty since they are only used to request a packet from the server.
 */
export interface ServerboundLocationPacketV1 extends VersionedPacket {}

/**
 * Reads a clientbound location packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ServerboundLocationPacketV1 {
    const reader = new PacketReader(buffer)
    return { version: reader.id }
}

/**
 * Writes a new serverbound location packet to a new buffer. The server will return either an error or a successful location packet.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data.
 */
export function write(): Buffer {
    return new PacketWriter(CURRENT_VERSION).buffer
}