import { test as base } from '@playwright/test'
import { GameBoardPage } from './pages/GameBoardPage'
import { FoundWordsPanel } from './pages/FoundWordsPanel'
import { FourtileStarsPanel } from './pages/FourtileStarsPanel'

interface Fixtures {
  board: GameBoardPage
  foundWordsPanel: FoundWordsPanel
  stars: FourtileStarsPanel
  // Auto-fixture that resets game state per test; it exposes no value to specs.
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  resetGame: void
}

export const test = base.extend<Fixtures>({
  board: async ({ page }, use) => {
    await use(new GameBoardPage(page))
  },
  foundWordsPanel: async ({ page }, use) => {
    await use(new FoundWordsPanel(page))
  },
  stars: async ({ page }, use) => {
    await use(new FourtileStarsPanel(page))
  },
  resetGame: [
    async ({ page }, use) => {
      await page.goto('/')
      await page.evaluate(() => {
        localStorage.clear()
      })
      await page.reload()
      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
