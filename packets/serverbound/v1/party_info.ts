import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const CURRENT_VERSION = 1

export interface ServerboundPartyInfoPacketV1 extends VersionedPacket {}

export function read(buffer: Buffer): ServerboundPartyInfoPacketV1 {
    const reader = new PacketReader(buffer)
    return { version: reader.id }
}

export function write(): Buffer {
    return new PacketWriter(CURRENT_VERSION).buffer
}