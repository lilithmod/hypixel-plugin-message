import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

export interface ClientboundHelloPacket {
    environment: number
}

/**
 * Reads a clientbound hello packet from a buffer.
 * @param buffer A buffer containing the packet data.
 * @returns The parsed ClientboundHelloPacket
 */
export function read(buffer: Buffer): ClientboundHelloPacket {
    const reader = new PacketReader(buffer)
    const environmentId = reader.readVarInt()
    
    const packet: ClientboundHelloPacket = {
        environment: environmentId
    }

    return packet
}

/**
 * Writes a clientbound hello packet to a new buffer.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data.
 */
export function write(packet: ClientboundHelloPacket): Buffer {
    return new PacketWriter(packet.environment).buffer
}