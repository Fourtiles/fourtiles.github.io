import type { Locator, Page } from '@playwright/test'

export class GameBoardPage {
  private readonly page: Page
  private readonly tileGrid: Locator

  constructor(page: Page) {
    this.page = page
    this.tileGrid = page.locator('#tile-grid')
  }

  private boardTile(tileName: string): Locator {
    return this.tileGrid
      .locator(`> [data-testid="tile"]`)
      .filter({ hasText: new RegExp(`^\\s*${tileName}\\s*$`) })
      .first()
  }

  async clickTile(tileName: string): Promise<void> {
    await this.boardTile(tileName).click()
  }

  async clickTiles(tiles: string[]): Promise<void> {
    for (const tile of tiles) {
      await this.boardTile(tile).click()
    }
  }

  async clickAdd(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add', exact: true }).click()
  }

  async clickShuffle(): Promise<void> {
    await this.page.getByLabel('Shuffle').click()
  }

  async clickSort(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sort' }).click()
  }

  getAllTiles(): Locator {
    return this.tileGrid.locator(`> [data-testid="tile"]`)
  }

  getCurrentWord(): Locator {
    return this.page.getByTestId('current-word')
  }

  async submitWord(tiles: string[]): Promise<void> {
    await this.clickTiles(tiles)
    await this.clickAdd()
  }
}
