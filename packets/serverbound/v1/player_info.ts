import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const CURRENT_VERSION = 1

/**
 * Represents a serverbound player info packet.
 * These are empty since they are only used to request a packet from the server.
 */
export interface ServerboundPlayerInfoPacketV1 extends VersionedPacket {}

/**
 * Reads a clientbound player info packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ServerboundPlayerInfoPacketV1 {
    const reader = new PacketReader(buffer)
    return { version: reader.id }
}

/**
 * Writes a new serverbound player info packet to a new buffer. The server will return either an error or a successful player info packet.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data.
 */
export function write(): Buffer {
    return new PacketWriter(CURRENT_VERSION).buffer
}