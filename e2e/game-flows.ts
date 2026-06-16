import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import type { GameBoardPage } from './pages/GameBoardPage'
import { tilesForWordFromPage } from './game-helpers'

/**
 * Plays a single word: resolves the tiles that spell it, clicks them, clicks
 * Add, and waits for the current word to clear before returning.
 */
export async function playWord(
  page: Page,
  board: GameBoardPage,
  word: string,
  timeout?: number,
): Promise<void> {
  const wordTiles = await tilesForWordFromPage(page, word)
  await board.clickTiles(wordTiles)
  await board.clickAdd()
  await expect(board.getCurrentWord()).toHaveText('', timeout ? { timeout } : undefined)
}

/**
 * Plays every word in {@link words} in order, one after another.
 */
export async function playWords(
  page: Page,
  board: GameBoardPage,
  words: string[],
  timeout?: number,
): Promise<void> {
  for (const word of words) {
    await playWord(page, board, word, timeout)
  }
}
