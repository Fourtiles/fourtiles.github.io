// https://on.cypress.io/api

import { GameBoardPage } from '../pages/GameBoardPage'
import { FoundWordsPanel } from '../pages/FoundWordsPanel'
import { FourtileStarsPanel } from '../pages/FourtileStarsPanel'

const board = new GameBoardPage()
const foundWords = new FoundWordsPanel()
const stars = new FourtileStarsPanel()

describe('Gameplay', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    board.visit('/')
    foundWords.getWordsRemaining().invoke('text').then(parseInt).as('wordsRemaining')
  })

  it('rejects an invalid word', function () {
    cy.invalidWord().then((tiles) => {
      board.submitWord(tiles!)
      foundWords.getFoundWordsContainer().within(() => {
        cy.findByText(tiles!.join('')).should('not.exist')
      })
    })
    foundWords.getWordsRemaining().should('have.text', this.wordsRemaining)
  })

  it('accepts a known word', function () {
    cy.validWord().then((tiles) => {
      board.submitWord(tiles!)
      foundWords.getFoundWordsContainer().within(() => {
        cy.findByText(tiles!.join('')).should('exist')
      })
    })
    foundWords.getWordsRemaining().should('have.text', this.wordsRemaining - 1)
    board.getCurrentWord().should('be.empty')
    cy.findByText('No words found yet.').should('not.exist')
  })

  it('rejects an already-played words', function () {
    cy.validWord().then(function (tiles) {
      board.submitWord(tiles!)
      board.submitWord(tiles!)
      foundWords.getFoundWordsContainer().within(() => {
        cy.findByText(tiles!.join('')).should('exist')
      })
    })
    foundWords.getWordsRemaining().should('have.text', this.wordsRemaining - 1)
  })

  describe('after a fourtile is found', () => {
    beforeEach(() => {
      cy.validFourtile()
        .as('fourtileTiles')
        .then((fourtileTiles) => {
          board.submitWord(fourtileTiles!)
        })
    })

    it('displays a star', () => {
      cy.findByText(/Make words by combining 2 or more tiles/).should('not.exist')
      stars.getFilledStars().should('have.length', 1)
      stars.getOpenStars().should('have.length', 4)
    })

    it('pushes the fourtile to the bottom', function () {
      board.getAllTiles().should((tiles) => tiles.text().endsWith(this.fourtileTiles!.join('')))
    })

    it('shuffles the board (except for fourtile tiles) when clicking Shuffle', function () {
      board.clickShuffle()
      board.getAllTiles().should((tiles) => tiles.text().endsWith(this.fourtileTiles!.join('')))
    })
  })

  describe('after a second fourtile is found', () => {
    beforeEach(() => {
      cy.validFourtile()
        .as('fourtileTiles1')
        .then((fourtileTiles) => {
          board.submitWord(fourtileTiles!)
        })
      board.getCurrentWord().should('be.empty')
      cy.validFourtile()
        .as('fourtileTiles2')
        .then((fourtileTiles) => {
          board.submitWord(fourtileTiles!)
        })
    })

    it('displays another star', () => {
      stars.getFilledStars().should('have.length', 2)
      stars.getOpenStars().should('have.length', 3)
    })

    it('pushes the fourtile to the bottom', function () {
      board
        .getAllTiles()
        .should((tiles) =>
          tiles.text().endsWith(this.fourtileTiles2!.join('') + this.fourtileTiles1!.join('')),
        )
    })
  })

  describe('after all fourtiles are found', () => {
    beforeEach(() => {
      cy.fourtiles()
        .as('fourtiles')
        .then((fourtiles) => {
          fourtiles!.forEach((fourtile) => {
            cy.tilesForWord(fourtile).then((tiles) => {
              board.clickTiles(tiles!)
            })
            board.clickAdd()
            board.getCurrentWord().should('be.empty')
          })
        })
    })

    it('pops confetti', () => {
      cy.get('canvas').should('exist')
    })

    it('shuffles and sorts all tiles', function () {
      board.getAllTiles().invoke('text').should('eq', this.fourtiles!.join(''))
      board.clickShuffle()
      board.getAllTiles().invoke('text').should('not.eq', this.fourtiles!.join(''))
      board.clickSort()
      board.getAllTiles().invoke('text').should('eq', this.fourtiles!.join(''))
    })
  })

  describe('after all words are shown', () => {
    beforeEach(() => {
      cy.words().then((words) => {
        words!.forEach((word) => {
          cy.tilesForWord(word).then((tiles) => {
            board.clickTiles(tiles!)
          })
          board.clickAdd()
          board.getCurrentWord().should('be.empty')
        })
      })
    })

    it('pops confetti and unicorns', () => {
      cy.get('canvas').should('exist')
      cy.findByTestId('unicorn').should('exist')
    })
  })

  describe('"Show all words" link', () => {
    it('reveals all words', function () {
      foundWords.clickShowAllWords()
      cy.words().then((words) => {
        foundWords.getFoundWordsContainer().within(() => {
          words.forEach((word) => cy.findByText(word).should('exist'))
        })
      })
      cy.findByText('Showing all words.').should('exist')
      foundWords.getWordsRemaining().should('have.text', this.wordsRemaining)
    })
  })

  describe('"New game" button', () => {
    it('starts a new game', () => {
      cy.findByText(/Make words by combining 2 or more tiles/).should('exist')
      cy.findByText('No words found yet.').should('exist')

      cy.words().then((oldWords) => {
        cy.validFourtile().then((tiles) => {
          board.submitWord(tiles!)
        })

        foundWords.clickStartNewGame()

        cy.words().then((newWords) => cy.wrap(newWords).should('not.deep.equal', oldWords))
        cy.findByText(/Make words by combining 2 or more tiles/).should('exist')
        cy.findByText('No words found yet.').should('exist')
      })
    })
  })
})
