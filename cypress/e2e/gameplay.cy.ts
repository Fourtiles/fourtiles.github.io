// https://on.cypress.io/api

describe('Gameplay', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.findByTestId('words-remaining').invoke('text').then(parseInt).as('wordsRemaining')
  })

  it('rejects an invalid word', function () {
    cy.invalidWord().then((tiles) => {
      tiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
      cy.findByRole('button', { name: 'Add' }).click()
      cy.findByTestId('found-words').findByText(tiles!.join('')).should('not.exist')
    })
    cy.findByTestId('words-remaining').should('have.text', this.wordsRemaining)
  })

  it('accepts a known word', function () {
    cy.validWord().then((tiles) => {
      tiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
      cy.findByRole('button', { name: 'Add' }).click()
      cy.findByTestId('found-words').findByText(tiles!.join('')).should('exist')
    })
    cy.findByTestId('words-remaining').should('have.text', this.wordsRemaining - 1)
    cy.findByTestId('current-word').should('be.empty')
    cy.findByText('No words found yet.').should('not.exist')
  })

  it('rejects an already-played words', function () {
    cy.validWord().then(function (tiles) {
      tiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
      cy.findByRole('button', { name: 'Add' }).click()
      tiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
      cy.findByRole('button', { name: 'Add' }).click()
      cy.findByTestId('found-words').findByText(tiles!.join('')).should('exist')
    })
    cy.findByTestId('words-remaining').should('have.text', this.wordsRemaining - 1)
  })

  describe('after a fourtile is found', () => {
    beforeEach(() => {
      cy.validFourtile()
        .as('fourtileTiles')
        .then((fourtileTiles) => {
          fourtileTiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
          cy.findByRole('button', { name: 'Add' }).click()
        })
    })

    it('displays a star', () => {
      cy.findByText(/Make words by combining 2 or more tiles/).should('not.exist')
      cy.findAllByTestId('star-filled').should('have.length', 1)
      cy.findAllByTestId('star-open').should('have.length', 4)
    })

    it('pushes the fourtile to the bottom', function () {
      cy.findAllByTestId('tile').should((tiles) =>
        tiles.text().endsWith(this.fourtileTiles!.join(''))
      )
    })

    it('shuffles the board (except for fourtile tiles) when clicking Shuffle', function () {
      cy.findByLabelText('Shuffle').click()
      cy.findAllByTestId('tile').should((tiles) =>
        tiles.text().endsWith(this.fourtileTiles!.join(''))
      )
    })
  })

  describe('after a second fourtile is found', () => {
    beforeEach(() => {
      cy.validFourtile()
        .as('fourtileTiles1')
        .then((fourtileTiles) => {
          fourtileTiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
          cy.findByRole('button', { name: 'Add' }).click()
        })
      cy.findByTestId('current-word').should('be.empty')
      cy.validFourtile()
        .as('fourtileTiles2')
        .then((fourtileTiles) => {
          fourtileTiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
          cy.findByRole('button', { name: 'Add' }).click()
        })
    })

    it('displays another star', () => {
      cy.findAllByTestId('star-filled').should('have.length', 2)
      cy.findAllByTestId('star-open').should('have.length', 3)
    })

    it('pushes the fourtile to the bottom', function () {
      cy.findAllByTestId('tile').should((tiles) =>
        tiles.text().endsWith(this.fourtileTiles2!.join('') + this.fourtileTiles1!.join(''))
      )
    })
  })

  describe('after all fourtiles are found', () => {
    beforeEach(() => {
      cy.fourtiles()
        .as('fourtiles')
        .then((fourtiles) => {
          fourtiles!.forEach((fourtile) => {
            cy.tilesForWord(fourtile).then((tiles) =>
              tiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
            )
            cy.findByRole('button', { name: 'Add' }).click()
            cy.findByTestId('current-word').should('be.empty')
          })
        })
    })

    it('pops confetti', () => {
      cy.get('canvas').should('exist')
    })

    it('shuffles and sorts all tiles', function () {
      cy.findAllByTestId('tile').invoke('text').should('eq', this.fourtiles!.join(''))
      cy.findByRole('button', { name: 'Shuffle' }).click()
      cy.findAllByTestId('tile').invoke('text').should('not.eq', this.fourtiles!.join(''))
      cy.findByRole('button', { name: 'Sort' }).click()
      cy.findAllByTestId('tile').invoke('text').should('eq', this.fourtiles!.join(''))
    })
  })

  describe('after all words are shown', () => {
    beforeEach(() => {
      cy.words().then((words) => {
        words!.forEach((words) => {
          cy.tilesForWord(words).then((tiles) =>
            tiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
          )
          cy.findByRole('button', { name: 'Add' }).click()
          cy.findByTestId('current-word').should('be.empty')
        })
      })
    })

    it('pops confetti and unicorns', () => {
      cy.get('canvas').should('exist')
      cy.findByTestId('unicorn').should('exist')
    })
  })

  describe('“Show all words” link', () => {
    it('reveals all words', function () {
      cy.findByText('Show all words').click()
      cy.words().then((words) => {
        words.forEach((word) => cy.findByTestId('found-words').findByText(word).should('exist'))
      })
      cy.findByText('Showing all words.').should('exist')
      cy.findByTestId('words-remaining').should('have.text', this.wordsRemaining)
    })
  })

  describe('“New game” button', () => {
    it('starts a new game', () => {
      cy.findByText(/Make words by combining 2 or more tiles/).should('exist')
      cy.findByText('No words found yet.').should('exist')

      cy.words().then((oldWords) => {
        cy.validFourtile().then((tiles) => {
          tiles!.forEach((tile) => cy.findByRole('button', { name: tile }).click())
          cy.findByRole('button', { name: 'Add' }).click()
        })

        cy.findByText('Start a new game').click()

        cy.words().then((newWords) => cy.wrap(newWords).should('not.deep.equal', oldWords))
        cy.findByText(/Make words by combining 2 or more tiles/).should('exist')
        cy.findByText('No words found yet.').should('exist')
      })
    })
  })
})
