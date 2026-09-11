import { afterEach, describe, expect, it, vi } from 'vitest'
import { shardSize } from 'virtual:game-shards'
import { fetchGame } from '@/functions'
import type { Game } from '@/stores/game'

function shardOfGames(): Game[] {
  return Array.from({ length: shardSize }, (_unused, position) => ({
    fourtiles: [`fourtile-${String(position)}`],
    otherWords: [],
    tiles: [],
  }))
}

function stubFetch(shard: Game[]) {
  const fetchShard = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(shard) })
  vi.stubGlobal('fetch', fetchShard)
  return fetchShard
}

describe('fetchGame', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches the shard holding the game and returns its record', async () => {
    const shard = shardOfGames()
    const fetchShard = stubFetch(shard)

    const game = await fetchGame(shardSize * 3 + 7)

    expect(fetchShard).toHaveBeenCalledWith('/games/3.json')
    expect(game).toBe(shard[7])
  })

  it('rejects when the shard cannot be fetched', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))

    await expect(fetchGame(0)).rejects.toThrow('404')
  })
})
