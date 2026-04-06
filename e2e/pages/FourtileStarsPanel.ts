import type { Locator, Page } from '@playwright/test'

export class FourtileStarsPanel {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  getFilledStars(): Locator {
    return this.page.getByTestId('star-filled')
  }

  getOpenStars(): Locator {
    return this.page.getByTestId('star-open')
  }
}
