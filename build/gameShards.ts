import { readFile } from 'node:fs/promises'
import type { ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

const GAMES_FILE = new URL('../src/data/games.json', import.meta.url)
const VIRTUAL_MODULE_ID = 'virtual:game-shards'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`
const SHARD_REQUEST = /^\/games\/(\d+)\.json$/u

/** Game records per shard file. */
const SHARD_SIZE = 25

/**
 * Splits the game dataset into small shard files the client can fetch one at a time.
 *
 * A build writes `games/<index>.json` for every shard and the dev server answers the
 * same paths from the source dataset, so picking a game costs one shard rather than
 * all 3,789 records. The shard layout is exposed to the client through the
 * `virtual:game-shards` module.
 */
export default function gameShards(): Plugin {
  return {
    name: 'fourtiles:game-shards',

    resolveId(id) {
      return id === VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : undefined
    },

    async load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return undefined

      const games = await readGames()
      return `export const gameCount = ${String(games.length)}\nexport const shardSize = ${String(SHARD_SIZE)}\n`
    },

    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const index = requestedShard(request.url)
        if (index === undefined) {
          next()
          return
        }

        void sendShard(index, response)
      })
    },

    async generateBundle() {
      const games = await readGames()

      for (let index = 0; index * SHARD_SIZE < games.length; index++) {
        this.emitFile({
          type: 'asset',
          fileName: `games/${String(index)}.json`,
          source: JSON.stringify(shardOf(games, index)),
        })
      }
    },
  }
}

async function readGames(): Promise<unknown[]> {
  return JSON.parse(await readFile(GAMES_FILE, 'utf8')) as unknown[]
}

function shardOf(games: unknown[], index: number): unknown[] {
  return games.slice(index * SHARD_SIZE, (index + 1) * SHARD_SIZE)
}

function requestedShard(url: string | undefined): number | undefined {
  const match = SHARD_REQUEST.exec(new URL(url ?? '/', 'http://localhost').pathname)
  return match ? Number(match[1]) : undefined
}

async function sendShard(index: number, response: ServerResponse): Promise<void> {
  const shard = shardOf(await readGames(), index)

  response.statusCode = shard.length > 0 ? 200 : 404
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(shard))
}
