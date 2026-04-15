import type { Page } from '@playwright/test'
import { difference, sample, without } from 'lodash-es'

async function getDataAttr(page: Page, attr: string): Promise<string[]> {
  const value = await page.getByTestId('game-board').getAttribute(attr)
  return value ? value.split(',') : []
}

export async function tiles(page: Page): Promise<string[]> {
  return getDataAttr(page, 'data-tiles')
}

export async function words(page: Page): Promise<string[]> {
  return getDataAttr(page, 'data-words')
}

export async function fourtiles(page: Page): Promise<string[]> {
  return getDataAttr(page, 'data-fourtiles')
}

export async function foundWords(page: Page): Promise<string[]> {
  return getDataAttr(page, 'data-found-words')
}

export function tilesForWord(tileList: string[], word: string): string[] | null {
  function dfs(currentSequence: string[], visited: Set<number>): string[] | null {
    const currentWord = currentSequence.join('')

    if (currentWord === word) return currentSequence
    if (currentWord.length > word.length) return null

    for (let i = 0; i < tileList.length; i++) {
      if (!visited.has(i) && tileList[i]) {
        const nextSequence = [...currentSequence, tileList[i]]

        if (word.startsWith(nextSequence.join(''))) {
          visited.add(i)
          const result = dfs(nextSequence, visited)
          if (result !== null) return result
          visited.delete(i)
        }
      }
    }

    return null
  }

  return dfs([], new Set())
}

export async function invalidWord(page: Page): Promise<string[]> {
  const tileList = await tiles(page)
  const wordList = await words(page)
  let unknownWord: string[] = [wordList[0] ?? '']
  while (wordList.includes(unknownWord.join(''))) {
    const tile1 = sample(tileList)!
    const tile2 = sample(without(tileList, tile1))!
    unknownWord = [tile1, tile2]
  }
  return unknownWord
}

export async function validWord(page: Page): Promise<string[]> {
  const wordList = await words(page)
  const found = await foundWords(page)
  const remaining = difference(wordList, found)
  const word = sample(remaining)
  if (!word)
    throw new Error(
      `No valid word found. Words: [${wordList.join(', ')}], Found: [${found.join(', ')}]`,
    )
  const tileList = await tiles(page)
  const result = tilesForWord(tileList, word)
  if (!result) throw new Error(`Could not form word "${word}" from tiles: [${tileList.join(', ')}]`)
  return result
}

export async function validFourtile(page: Page): Promise<string[]> {
  const fourtileList = await fourtiles(page)
  const found = await foundWords(page)
  const remaining = difference(fourtileList, found)
  const word = sample(remaining)
  if (!word)
    throw new Error(
      `No valid fourtile found. Fourtiles: [${fourtileList.join(', ')}], Found: [${found.join(', ')}]`,
    )
  const tileList = await tiles(page)
  const result = tilesForWord(tileList, word)
  if (!result)
    throw new Error(`Could not form fourtile "${word}" from tiles: [${tileList.join(', ')}]`)
  return result
}

export async function tilesForWordFromPage(page: Page, word: string): Promise<string[]> {
  const tileList = await tiles(page)
  const result = tilesForWord(tileList, word)
  if (!result) throw new Error(`Could not form word "${word}" from tiles: [${tileList.join(', ')}]`)
  return result
}
