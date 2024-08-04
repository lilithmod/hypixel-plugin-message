import { VersionedPacket } from '../../../mod'
import { PacketReader, PacketWriter } from '@lilithmod/unborn-mcproto'

const MAX_IDENTIFIER_LENGTH = 20
const MAX_IDENTIFIERS = 5
const CURRENT_VERSION = 1

export interface ServerboundRegisterPacketV1 extends VersionedPacket {
    subscribedEvents: Map<string, number>
}

export interface PacketRegistry {
    getEventVersions(subscribedEventIdentifiers: Set<string>): Map<string, number>
}

/**
 * Creates a new ServerboundRegisterPacket.
 * @param registry The packet registry to use for getting event versions.
 * @param subscribedEventIdentifiers The set of event identifiers to subscribe to.
 * @returns A ServerboundRegisterPacketV1 object.
 * @throws Error if the number of subscribed events exceeds MAX_IDENTIFIERS.
 */
export function create(registry: PacketRegistry, subscribedEventIdentifiers: Set<string>): ServerboundRegisterPacketV1 {
    const subscribedEvents = registry.getEventVersions(subscribedEventIdentifiers)

    if (subscribedEvents.size > MAX_IDENTIFIERS) {
        throw new Error(`wantedPackets cannot contain more than ${MAX_IDENTIFIERS} identifiers`)
    }

    return {
        version: CURRENT_VERSION,
        subscribedEvents
    }
}

/**
 * Reads a serverbound register packet from a buffer.
 * @param buffer A buffer containing the packet data.
 * @returns The parsed ServerboundRegisterPacketV1
 * @throws Error if the number of subscribed events exceeds MAX_IDENTIFIERS.
 */
export function read(buffer: Buffer): ServerboundRegisterPacketV1 {
    const reader = new PacketReader(buffer)
    const version = reader.readVarInt()
    const size = reader.readVarInt()

    if (size > MAX_IDENTIFIERS) {
        throw new Error(`wantedPackets cannot contain more than ${MAX_IDENTIFIERS} identifiers`)
    }

    const subscribedEvents = new Map<string, number>()
    for (let i = 0; i < size; i++) {
        const key = reader.readString();
        const value = reader.readVarInt()
        subscribedEvents.set(key, value)
    }

    return { version, subscribedEvents }
}

/**
 * Writes a serverbound register packet to a new buffer.
 * @param packet The packet to write.
 * @returns A buffer containing the packet data.
 */
export function write(packet: ServerboundRegisterPacketV1): Buffer {
    const writer = new PacketWriter(CURRENT_VERSION)
    writer.writeVarInt(packet.subscribedEvents.size)
    for (const [event, version] of packet.subscribedEvents) {
        writer.writeString(event)
        writer.writeVarInt(version)
    }
    return writer.buffer
}