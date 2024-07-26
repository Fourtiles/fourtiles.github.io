import mitt from 'mitt'

const gameBus = mitt<{
  validWordFound: string
  wordNotRecognized: string
  wordAlreadyFound: string
  allFourtilesFound: undefined
  allWordsFound: undefined
}>()
export default gameBus
