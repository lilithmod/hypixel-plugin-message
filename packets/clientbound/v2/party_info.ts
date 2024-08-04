import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const CURRENT_VERSION = 1

enum PartyRole {
    LEADER,
    MOD,
    MEMBER
}

interface PartyMember {
    uuid: string
    role: PartyRole
}

export interface ClientboundPartyInfoPacketV2 extends VersionedPacket {
    inParty: boolean
    members?: Map<string, PartyMember>
}

/**
 * Reads a clientbound party info packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ClientboundPartyInfoPacketV2 {
    const reader = new PacketReader(buffer)
    const inParty = reader.readBool()

    const packet: ClientboundPartyInfoPacketV2 = {
        version: reader.id,
        inParty,
        members: new Map()
    }

    if (inParty) {
        const memberCount = reader.readVarInt()
        for (let i = 0; i < memberCount; i++) {
            const uuid = reader.readUUID()
            const role = reader.readVarInt() as PartyRole
            packet.members?.set(uuid, { uuid, role })
        }
    }

    return packet
}

/**
 * Writes a clientbound party info packet to a new buffer.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data. A success byte should be written to the buffer before this data.
 */
export function write(packet: ClientboundPartyInfoPacketV2): Buffer {
    const writer = new PacketWriter(CURRENT_VERSION)

    writer
        .writeBool(packet.inParty)

    if (packet.inParty) {
        writer.writeVarInt(packet.members?.size ?? 0)
        for (const [uuid, member] of packet.members ?? []) {
            writer.writeUUID(uuid)
            writer.writeVarInt(member.role)
        }
    }

    return writer.buffer
}