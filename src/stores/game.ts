import { defineStore } from 'pinia'
import { concat, difference, intersection, isNull, pull, shuffle, union } from 'lodash-es'
import gameBus from '@/emitters/gameBus'

export interface Game {
  fourtiles: string[]
  otherWords: string[]
  tiles: string[]
}

const useGameStore = defineStore('game', {
  state: () => ({
    game: null as Game | null,
    tiles: [] as string[],
    foundWords: [] as string[],
    tilesUsedInFourtiles: [] as string[],
    currentWord: [] as string[]
  }),

  getters: {
    fourtileWords(state): string[] {
      return state.game?.fourtiles ?? []
    },
    allPossibleWords(state): string[] {
      return concat(state.game?.fourtiles ?? [], state.game?.otherWords ?? [])
    },
    isLoading(state): boolean {
      return isNull(state.game)
    },
    numWordsRemaining(state): number {
      return this.allPossibleWords.length - state.foundWords.length
    },
    allFourtilesFound(state): boolean {
      return intersection(state.foundWords, this.fourtileWords).length === this.fourtileWords.length
    },
    allWordsFound(): boolean {
      return this.numWordsRemaining === 0
    },
    tilesNotUsedInFourtiles(state): string[] {
      return difference(state.tiles, state.tilesUsedInFourtiles)
    },
    tilesOnBoard(state): string[] {
      return difference(state.tiles, state.currentWord)
    },
    numFourtilesFound(state): number {
      return intersection(state.foundWords, this.fourtileWords).length
    }
  },

  actions: {
    startGame(newGame: Game) {
      console.log(newGame)
      this.$patch({
        game: newGame,
        tiles: shuffle(newGame.tiles),
        foundWords: [],
        tilesUsedInFourtiles: [],
        currentWord: []
      })
    },

    resetGame() {
      this.game = null
    },

    addFoundWord() {
      const foundWord = this.currentWord.join('')

      if (!this.allPossibleWords.includes(foundWord)) {
        gameBus.emit('wordNotRecognized', foundWord)
        return false
      }
      if (this.foundWords.includes(foundWord)) {
        gameBus.emit('wordAlreadyFound', foundWord)
        return false
      }

      if (this.fourtileWords.includes(foundWord))
        this.tilesUsedInFourtiles = union(this.tilesUsedInFourtiles, this.currentWord)

      this.foundWords.push(foundWord)
      gameBus.emit('validWordFound', foundWord)

      if (this.allFourtilesFound && this.fourtileWords.includes(foundWord))
        gameBus.emit('allFourtilesFound')
      if (this.allWordsFound) gameBus.emit('allWordsFound')

      return true
    },

    resetCurrentWord() {
      this.currentWord = []
    },

    addTile(tile: string) {
      if (this.currentWord.includes(tile)) return
      this.currentWord.push(tile)
    },

    removeTile(tile: string) {
      pull(this.currentWord, tile)
    },

    shuffleTiles() {
      if (this.allFourtilesFound) {
        this.tiles = shuffle(this.tiles)
      } else {
        this.tiles = concat(shuffle(this.tilesNotUsedInFourtiles), this.tilesUsedInFourtiles)
      }
    },

    sortTiles() {
      this.tiles = concat(this.tilesNotUsedInFourtiles, this.tilesUsedInFourtiles)
    }
  }
})

export default useGameStore
