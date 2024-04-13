import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'
import { MonthlyPackageRank, PackageRank, PlayerRank, getMonthlyPackageRankFromId, getPackageRankFromId, getPlayerRankFromId, monthlyPackageRankToId, packageRankToId, playerRankToId } from '../../../enums'

const CURRENT_VERSION = 1

export interface ClientboundPlayerInfoPacketV1 extends VersionedPacket {
    playerRank: PlayerRank
    packageRank: PackageRank
    monthlyPackageRank: MonthlyPackageRank
    prefix?: string
}

/**
 * Reads a clientbound player info packet from a buffer.
 * @param buffer A buffer containing the packet data. The version number should be the first entry in the buffer.
 * @returns 
 */
export function read(buffer: Buffer): ClientboundPlayerInfoPacketV1 {
    const reader = new PacketReader(buffer)
    
    const packet: ClientboundPlayerInfoPacketV1 = {
        version: reader.id,
        playerRank: getPlayerRankFromId(reader.readVarInt()),
        packageRank: getPackageRankFromId(reader.readVarInt()),
        monthlyPackageRank: getMonthlyPackageRankFromId(reader.readVarInt()),
        prefix: reader.readOptional(reader.readString.bind(reader))
    }

    if (packet.prefix == undefined) delete packet.prefix

    return packet
}

/**
 * Writes a clientbound player info packet to a new buffer.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data. A success byte should be written to the buffer before this data.
 */
export function write(packet: ClientboundPlayerInfoPacketV1): Buffer {
    const writer = new PacketWriter(CURRENT_VERSION)

    writer
        .writeVarInt(playerRankToId(packet.playerRank))
        .writeVarInt(packageRankToId(packet.packageRank))
        .writeVarInt(monthlyPackageRankToId(packet.monthlyPackageRank))
        .writeOptional(packet.prefix, writer.writeString.bind(writer))

    return writer.buffer
}