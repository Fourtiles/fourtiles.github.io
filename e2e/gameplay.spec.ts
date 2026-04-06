import { test, expect } from './fixtures'
import {
  invalidWord,
  validWord,
  validFourtile,
  fourtiles,
  tiles,
  words,
  tilesForWordFromPage,
} from './game-helpers'

test.describe('Gameplay', () => {
  let wordsRemaining: number

  test.beforeEach(async ({ page, foundWordsPanel }) => {
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
    })
    await page.reload()
    wordsRemaining = parseInt(await foundWordsPanel.getWordsRemaining().innerText(), 10)
  })

  test('rejects an invalid word', async ({ page, board, foundWordsPanel }) => {
    const tiles = await invalidWord(page)
    await board.submitWord(tiles)
    await expect(foundWordsPanel.getFoundWordsContainer().getByText(tiles.join(''))).toHaveCount(0)
    await expect(foundWordsPanel.getWordsRemaining()).toHaveText(String(wordsRemaining))
  })

  test('accepts a known word', async ({ page, board, foundWordsPanel }) => {
    const tiles = await validWord(page)
    await board.submitWord(tiles)
    await expect(foundWordsPanel.getFoundWordsContainer().getByText(tiles.join(''))).toBeVisible()
    await expect(foundWordsPanel.getWordsRemaining()).toHaveText(String(wordsRemaining - 1))
    await expect(board.getCurrentWord()).toHaveText('')
    await expect(page.getByText('No words found yet.')).toHaveCount(0)
  })

  test('rejects an already-played word', async ({ page, board, foundWordsPanel }) => {
    const tiles = await validWord(page)
    await board.submitWord(tiles)
    await expect(board.getCurrentWord()).toHaveText('')
    await board.submitWord(tiles)
    await expect(foundWordsPanel.getFoundWordsContainer().getByText(tiles.join(''))).toBeVisible()
    await expect(foundWordsPanel.getWordsRemaining()).toHaveText(String(wordsRemaining - 1))
  })

  test.describe('after a fourtile is found', () => {
    let fourtileTiles: string[]

    test.beforeEach(async ({ page, board }) => {
      fourtileTiles = await validFourtile(page)
      await board.submitWord(fourtileTiles)
    })

    test('displays a star', async ({ page, stars }) => {
      await expect(page.getByText(/Make words by combining 2 or more tiles/)).toHaveCount(0)
      await expect(stars.getFilledStars()).toHaveCount(1)
      await expect(stars.getOpenStars()).toHaveCount(4)
    })

    test('pushes the fourtile to the bottom', async ({ page }) => {
      await expect(async () => {
        const tileList = await tiles(page)
        const joined = tileList.join('')
        expect(joined.endsWith(fourtileTiles.join(''))).toBe(true)
      }).toPass()
    })

    test('shuffles the board (except for fourtile tiles) when clicking Shuffle', async ({
      page,
      board,
    }) => {
      await board.clickShuffle()
      await expect(async () => {
        const tileList = await tiles(page)
        const joined = tileList.join('')
        expect(joined.endsWith(fourtileTiles.join(''))).toBe(true)
      }).toPass()
    })
  })

  test.describe('after a second fourtile is found', () => {
    let fourtileTiles1: string[]
    let fourtileTiles2: string[]

    test.beforeEach(async ({ page, board }) => {
      fourtileTiles1 = await validFourtile(page)
      await board.submitWord(fourtileTiles1)
      await expect(board.getCurrentWord()).toHaveText('')
      fourtileTiles2 = await validFourtile(page)
      await board.submitWord(fourtileTiles2)
    })

    test('displays another star', async ({ stars }) => {
      await expect(stars.getFilledStars()).toHaveCount(2)
      await expect(stars.getOpenStars()).toHaveCount(3)
    })

    test('pushes the fourtile to the bottom', async ({ page }) => {
      await expect(async () => {
        const tileList = await tiles(page)
        const joined = tileList.join('')
        expect(joined.endsWith(fourtileTiles1.join('') + fourtileTiles2.join(''))).toBe(true)
      }).toPass()
    })
  })

  test.describe('after all fourtiles are found', () => {
    test.setTimeout(60_000)

    let fourtileWords: string[]

    test.beforeEach(async ({ page, board }) => {
      fourtileWords = await fourtiles(page)
      for (const fourtile of fourtileWords) {
        const tiles = await tilesForWordFromPage(page, fourtile)
        await board.clickTiles(tiles)
        await board.clickAdd()
        await expect(board.getCurrentWord()).toHaveText('')
      }
    })

    test('pops confetti', async ({ page }) => {
      await expect(page.locator('canvas')).toBeAttached()
    })

    test('shuffles and sorts all tiles', async ({ page, board }) => {
      const sortedText = fourtileWords.join('')
      await expect(async () => {
        const tileList = await tiles(page)
        expect(tileList.join('')).toBe(sortedText)
      }).toPass()

      await board.clickShuffle()
      await expect(async () => {
        const tileList = await tiles(page)
        expect(tileList.join('')).not.toBe(sortedText)
      }).toPass()

      await board.clickSort()
      await expect(async () => {
        const tileList = await tiles(page)
        expect(tileList.join('')).toBe(sortedText)
      }).toPass()
    })
  })

  test.describe('after all words are shown', () => {
    test.setTimeout(120_000)

    test.beforeEach(async ({ page, board }) => {
      const allWords = await words(page)
      for (const word of allWords) {
        const wordTiles = await tilesForWordFromPage(page, word)
        await board.clickTiles(wordTiles)
        await board.clickAdd()
        await expect(board.getCurrentWord()).toHaveText('', { timeout: 10_000 })
      }
    })

    test('pops confetti and unicorns', async ({ page }) => {
      await expect(page.locator('canvas')).toBeAttached()
      await expect(page.getByTestId('unicorn')).toBeAttached()
    })
  })

  test.describe('"Show all words" link', () => {
    test('reveals all words', async ({ page, foundWordsPanel }) => {
      await foundWordsPanel.clickShowAllWords()
      const allWords = await words(page)
      for (const word of allWords) {
        await expect(
          foundWordsPanel.getFoundWordsContainer().getByText(word, { exact: true }),
        ).toBeVisible()
      }
      await expect(page.getByText('Showing all words.')).toBeVisible()
      await expect(foundWordsPanel.getWordsRemaining()).toHaveText(String(wordsRemaining))
    })
  })

  test.describe('"New game" button', () => {
    test('starts a new game', async ({ page, board, foundWordsPanel }) => {
      await expect(page.getByText(/Make words by combining 2 or more tiles/)).toBeVisible()
      await expect(page.getByText('No words found yet.')).toBeVisible()

      const oldWords = await words(page)
      const tiles = await validFourtile(page)
      await board.submitWord(tiles)

      await foundWordsPanel.clickStartNewGame()

      const newWords = await words(page)
      expect(newWords).not.toEqual(oldWords)
      await expect(page.getByText(/Make words by combining 2 or more tiles/)).toBeVisible()
      await expect(page.getByText('No words found yet.')).toBeVisible()
    })
  })
})
