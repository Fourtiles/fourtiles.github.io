/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="./commands" />

import '@testing-library/cypress/add-commands'
import { difference, sample, without } from 'lodash-es'

Cypress.Commands.add('tiles', () =>
  cy
    .get('main')
    .invoke('attr', 'data-tiles')
    .then((v) => (v ? v.split(',') : []))
)

Cypress.Commands.add('words', () =>
  cy
    .get('main')
    .invoke('attr', 'data-words')
    .then((v) => (v ? v.split(',') : []))
)

Cypress.Commands.add('fourtiles', () =>
  cy
    .get('main')
    .invoke('attr', 'data-fourtiles')
    .then((v) => (v ? v.split(',') : []))
)

Cypress.Commands.add('foundWords', () =>
  cy
    .get('main')
    .invoke('attr', 'data-found-words')
    .then((v) => (v ? v.split(',') : []))
)

Cypress.Commands.add('tilesForWord', (word: string) => {
  cy.tiles().then((tiles) => {
    function dfs(currentSequence: string[], visited: Set<number>): string[] | null {
      const currentWord = currentSequence.join('')

      if (currentWord === word) return currentSequence
      if (currentWord.length > word.length) return null

      for (let i = 0; i < tiles.length; i++) {
        if (!visited.has(i) && tiles[i]) {
          const nextSequence = [...currentSequence, tiles[i]!]

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
  })
})

Cypress.Commands.add('invalidWord', () => {
  cy.tiles().then((tiles) => {
    cy.words().then((words) => {
      let unknownWord: string[] = [words[0] ?? '']
      while (words.includes(unknownWord.join(''))) {
        const tile1 = sample(tiles)!
        const tile2 = sample(without(tiles, tile1))!
        unknownWord = [tile1, tile2]
      }
      return unknownWord
    })
  })
})

Cypress.Commands.add('validWord', () => {
  cy.words().then((words) => {
    cy.foundWords().then((foundWords) => {
      const word = sample(difference(words, foundWords))
      if (!word) return null
      return cy.tilesForWord(word)
    })
  })
})

Cypress.Commands.add('validFourtile', () => {
  cy.fourtiles().then((fourtiles) => {
    cy.foundWords().then((foundWords) => {
      const word = sample(difference(fourtiles, foundWords))
      if (!word) return null
      return cy.tilesForWord(word)
    })
  })
})

Cypress.Commands.add('alreadyGuessedWord', () => {
  cy.foundWords().then((foundWords) => {
    const word = sample(foundWords)
    if (!word) return null
    return cy.tilesForWord(word)
  })
})
