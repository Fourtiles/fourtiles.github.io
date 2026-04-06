import type { Locator, Page } from '@playwright/test'

export class FoundWordsPanel {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  getWordsRemaining(): Locator {
    return this.page.getByTestId('words-remaining')
  }

  getFoundWordsContainer(): Locator {
    return this.page.getByTestId('found-words')
  }

  async clickShowAllWords(): Promise<void> {
    await this.page.getByText('Show all words').click()
  }

  async clickStartNewGame(): Promise<void> {
    await this.page.getByText('Start a new game').click()
  }
}
