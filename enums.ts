/**
 * Enums for Hypixel API, adapted from https://github.com/HypixelDev/HypixelData
 * @module
 */

/**
 * The packet errors returned instead of clientbound packets when something goes wrong.
 */
export enum PacketErrorId {
    DISABLED = 1,
    INTERNAL_SERVER_ERROR,
    RATE_LIMITED,
    INVALID_PACKET_VERSION,
    NO_LONGER_SUPPORTED
}

export type PacketError = 'DISABLED' | 'INTERNAL_SERVER_ERROR' | 'RATE_LIMITED' | 'INVALID_PACKET_VERSION' | 'NO_LONGER_SUPPORTED'

export function getPacketErrorFromId(id: PacketErrorId): PacketError {
    switch (id) {
        case PacketErrorId.DISABLED:
            return 'DISABLED'
        case PacketErrorId.INTERNAL_SERVER_ERROR:
            return 'INTERNAL_SERVER_ERROR'
        case PacketErrorId.RATE_LIMITED:
            return 'RATE_LIMITED'
        case PacketErrorId.INVALID_PACKET_VERSION:
            return 'INVALID_PACKET_VERSION'
        case PacketErrorId.NO_LONGER_SUPPORTED:
            return 'NO_LONGER_SUPPORTED'
        default:
            throw new Error(`Unknown packet error id: ${id}`)
    }
}

export function packetErrorToId(error: PacketError): PacketErrorId {
    switch (error) {
        case 'DISABLED':
            return PacketErrorId.DISABLED
        case 'INTERNAL_SERVER_ERROR':
            return PacketErrorId.INTERNAL_SERVER_ERROR
        case 'RATE_LIMITED':
            return PacketErrorId.RATE_LIMITED
        case 'INVALID_PACKET_VERSION':
            return PacketErrorId.INVALID_PACKET_VERSION
        case 'NO_LONGER_SUPPORTED':
            return PacketErrorId.NO_LONGER_SUPPORTED
        default:
            throw new Error(`Unknown packet error: ${error}`)
    }
}

/**
 * The Hypixel server environment currently running.
 */
export enum EnvironmentId {
    PRODUCTION,
    BETA,
    TEST
}

export type Environment = 'PRODUCTION' | 'BETA' | 'TEST'

export function getEnvironmentFromId(id: EnvironmentId): Environment {
    switch (id) {
        case 0:
            return 'PRODUCTION'
        case 1:
            return 'BETA'
        case 2:
            return 'TEST'
        default:
            throw new Error(`Unknown environment id: ${id}`)
    }
}

export function environmentToId(environment: Environment): number {
    switch (environment) {
        case 'PRODUCTION':
            return 0
        case 'BETA':
            return 1
        case 'TEST':
            return 2
        default:
            throw new Error(`Unknown environment: ${environment}`)
    }
}

/**
 * The Hypixel server type, either a game type or a lobby type.
 * Eventually these will be more strongly typed within this package.
 * https://github.com/HypixelDev/HypixelData/blob/master/src/main/java/net/hypixel/data/type/GameType.java
 * https://github.com/HypixelDev/HypixelData/blob/master/src/main/java/net/hypixel/data/type/LobbyType.java
 */
export interface ServerType {
    name: string
}


/**
 * The permanent rank of a player.
 */
export enum PackageRankId {
    NONE = 1,
    VIP,
    VIP_PLUS,
    MVP,
    MVP_PLUS
}

export type PackageRank = 'NONE' | 'VIP' | 'VIP_PLUS' | 'MVP' | 'MVP_PLUS'

export function getPackageRankFromId(id: PackageRankId): PackageRank {
    switch (id) {
        case PackageRankId.NONE:
            return 'NONE'
        case PackageRankId.VIP:
            return 'VIP'
        case PackageRankId.VIP_PLUS:
            return 'VIP_PLUS'
        case PackageRankId.MVP:
            return 'MVP'
        case PackageRankId.MVP_PLUS:
            return 'MVP_PLUS'
        default:
            throw new Error(`Unknown package rank id: ${id}`)
    }
}

export function packageRankToId(rank: PackageRank): PackageRankId {
    switch (rank) {
        case 'NONE':
            return PackageRankId.NONE
        case 'VIP':
            return PackageRankId.VIP
        case 'VIP_PLUS':
            return PackageRankId.VIP_PLUS
        case 'MVP':
            return PackageRankId.MVP
        case 'MVP_PLUS':
            return PackageRankId.MVP_PLUS
        default:
            throw new Error(`Unknown package rank: ${rank}`)
    }
}

/**
 * The monthly rank of a player.
 */
export enum MonthlyPackageRankId {
    NONE = 1,
    SUPERSTAR
}

export type MonthlyPackageRank = 'NONE' | 'SUPERSTAR'

export function getMonthlyPackageRankFromId(id: MonthlyPackageRankId): MonthlyPackageRank {
    switch (id) {
        case MonthlyPackageRankId.NONE:
            return 'NONE'
        case MonthlyPackageRankId.SUPERSTAR:
            return 'SUPERSTAR'
        default:
            throw new Error(`Unknown monthly package rank id: ${id}`)
    }
}

export function monthlyPackageRankToId(rank: MonthlyPackageRank): MonthlyPackageRankId {
    switch (rank) {
        case 'NONE':
            return MonthlyPackageRankId.NONE
        case 'SUPERSTAR':
            return MonthlyPackageRankId.SUPERSTAR
        default:
            throw new Error(`Unknown monthly package rank: ${rank}`)
    }
}

/**
 * The special rank of a player.
 */
export enum PlayerRankId {
    NORMAL = 1,
    YOUTUBER,
    GAME_MASTER,
    ADMIN
}

export type PlayerRank = 'NORMAL' | 'YOUTUBER' | 'GAME_MASTER' | 'ADMIN'

export function getPlayerRankFromId(id: PlayerRankId): PlayerRank {
    switch (id) {
        case PlayerRankId.NORMAL:
            return 'NORMAL'
        case PlayerRankId.YOUTUBER:
            return 'YOUTUBER'
        case PlayerRankId.GAME_MASTER:
            return 'GAME_MASTER'
        case PlayerRankId.ADMIN:
            return 'ADMIN'
        default:
            throw new Error(`Unknown player rank id: ${id}`)
    }
}

export function playerRankToId(rank: PlayerRank): PlayerRankId {
    switch (rank) {
        case 'NORMAL':
            return PlayerRankId.NORMAL
        case 'YOUTUBER':
            return PlayerRankId.YOUTUBER
        case 'GAME_MASTER':
            return PlayerRankId.GAME_MASTER
        case 'ADMIN':
            return PlayerRankId.ADMIN
        default:
            throw new Error(`Unknown player rank: ${rank}`)
    }
}