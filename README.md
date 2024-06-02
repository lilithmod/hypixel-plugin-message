# Hypixel Plugin Message API

A self-contained API for using the Hypixel plugin messages API. Uses `@lilithmod/unborn-mcproto` (on NPM) for packet reading and writing, but is compatible with `node-minecraft-protocol` and any other library that exposes plugin messages as buffers as well.

All enums from https://github.com/HypixelDev/HypixelData are converted automatically into string representations. The only current exception is ServerType, which currently returns its raw string.

See [the announcement thread](https://hypixel.net/threads/hypixel-mod-api-developer-preview-feedback.5635119/) for more information.

Adapted based on: https://github.com/HypixelDev/ModAPI

Currently up-to-date with ModAPI release 0.2.1

## Installation

```bash
npx jsr add @lilith/hypixel-plugin-message
yarn dlx jsr add @lilith/hypixel-plugin-message
pnpm dlx jsr add @lilith/hypixel-plugin-message
bunx jsr add @lilith/hypixel-plugin-message
```

## Usage

```ts
import { readClientboundPacket, writeServerboundPacket } from '@lilith/hypixel-plugin-message'

const request: Buffer = writeServerboundPacket('ping', { version: 1})

// Send buffer as plugin message with channel hypixel:ping

const response: Buffer // Received buffer from clientbound plugin message with channel hypixel:ping

const packet = readClientboundPacket('ping', buffer) // { version: 1, response: "pong" }
```
