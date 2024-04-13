import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const CURRENT_VERSION = 1

export interface ClientboundPartyInfoPacketV1 extends VersionedPacket {
    inParty: boolean
    leader?: string
    members?: string[]
}

/**
 * Reads a clientbound party info packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ClientboundPartyInfoPacketV1 {
    const reader = new PacketReader(buffer)
    const inParty = reader.readBool()

    const packet: ClientboundPartyInfoPacketV1 = {
        version: reader.id,
        inParty
    }

    if (inParty) {
        packet.leader = reader.readUUID()
        packet.members = reader.readArray(reader.readUUID.bind(reader))
    }

    return packet
}

/**
 * Writes a clientbound party info packet to a new buffer.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data. A success byte should be written to the buffer before this data.
 */
export function write(packet: ClientboundPartyInfoPacketV1): Buffer {
    const writer = new PacketWriter(CURRENT_VERSION)

    writer
        .writeBool(packet.inParty)

    if (packet.inParty) {
        writer
            .writeUUID(packet.leader!)
            .writeArray(packet.members!, writer.writeUUID.bind(writer))
    }

    return writer.buffer
}