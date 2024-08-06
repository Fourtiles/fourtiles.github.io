import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import FoundWords from '../FoundWords.vue'
import { createTestingPinia } from '@pinia/testing'

describe('FoundWords', () => {
  describe('no words found', () => {
    it('shows “No words found yet”', () => {
      render(FoundWords, {
        global: {
          plugins: [createTestingPinia()]
        }
      })

      expect(screen.getByTestId('found-words').textContent).toContain('No words found yet.')
    })
  })

  describe('some words found', () => {
    it('shows a list of found words', () => {
      render(FoundWords, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                game: {
                  foundWords: ['cat', 'dog', 'fish']
                }
              }
            })
          ]
        }
      })

      expect(screen.getByTestId('found-words').textContent).toContain('catdogfish')
    })
  })

  describe('showing all words', () => {
    it('shows all found words', async () => {
      render(FoundWords, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                game: {
                  game: {
                    fourtiles: ['appendix', 'billabong'],
                    otherWords: ['cat', 'dog', 'fish']
                  }
                }
              }
            })
          ]
        }
      })

      const showAll = await screen.findByText('Show all words')
      await fireEvent.click(showAll)

      expect(screen.getByText('Showing all words.')).toBeTruthy()
      expect(screen.getByTestId('found-words').textContent).toContain('appendixbillabongcatdogfish')
    })
  })
})
