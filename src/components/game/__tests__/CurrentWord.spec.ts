import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import CurrentWord from '../CurrentWord.vue'
import gameBus from '../../../emitters/gameBus'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'

describe('CurrentWord', () => {
  describe('on wordAlreadyFound event', () => {
    it('sets the word-already-found class', async () => {
      render(CurrentWord, {
        global: {
          plugins: [createTestingPinia()]
        }
      })

      expect(
        screen.getByTestId('current-word').classList.contains('word-already-found')
      ).toBeFalsy()
      gameBus.emit('wordAlreadyFound', 'test')
      await nextTick()
      expect(
        screen.getByTestId('current-word').classList.contains('word-already-found')
      ).toBeTruthy()
    })
  })

  describe('on wordNotRecognized event', () => {
    it('sets the unknown-word class', async () => {
      render(CurrentWord, {
        global: {
          plugins: [createTestingPinia()]
        }
      })

      expect(screen.getByTestId('current-word').classList.contains('unknown-word')).toBeFalsy()
      gameBus.emit('wordNotRecognized', 'test')
      await nextTick()
      expect(screen.getByTestId('current-word').classList.contains('unknown-word')).toBeTruthy()
    })
  })
  describe('on validWordFound event', () => {
    it('sets the valid-word class', async () => {
      render(CurrentWord, {
        global: {
          plugins: [createTestingPinia()]
        }
      })

      expect(screen.getByTestId('current-word').classList.contains('valid-word')).toBeFalsy()
      gameBus.emit('validWordFound', 'test')
      await nextTick()
      expect(screen.getByTestId('current-word').classList.contains('valid-word')).toBeTruthy()
    })
  })
})
