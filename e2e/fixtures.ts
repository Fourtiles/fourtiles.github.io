import { test as base } from '@playwright/test'
import { GameBoardPage } from './pages/GameBoardPage'
import { FoundWordsPanel } from './pages/FoundWordsPanel'
import { FourtileStarsPanel } from './pages/FourtileStarsPanel'

interface Fixtures {
  freshGame: Record<string, never>
  board: GameBoardPage
  foundWordsPanel: FoundWordsPanel
  stars: FourtileStarsPanel
}

export const test = base.extend<Fixtures>({
  freshGame: [
    async ({ page }, use) => {
      await page.goto('/')
      await page.evaluate(() => {
        localStorage.clear()
      })
      await page.reload()
      await use({})
    },
    { auto: true },
  ],
  board: async ({ page }, use) => {
    await use(new GameBoardPage(page))
  },
  foundWordsPanel: async ({ page }, use) => {
    await use(new FoundWordsPanel(page))
  },
  stars: async ({ page }, use) => {
    await use(new FourtileStarsPanel(page))
  },
})

export { expect } from '@playwright/test'
