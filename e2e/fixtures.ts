import { test as base } from '@playwright/test'
import { GameBoardPage } from './pages/GameBoardPage'
import { FoundWordsPanel } from './pages/FoundWordsPanel'
import { FourtileStarsPanel } from './pages/FourtileStarsPanel'

interface Fixtures {
  board: GameBoardPage
  foundWordsPanel: FoundWordsPanel
  stars: FourtileStarsPanel
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
})

export { expect } from '@playwright/test'
