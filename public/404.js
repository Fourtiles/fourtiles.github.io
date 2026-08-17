/* A mini Fourtiles game for `404.html`. The real game splits a word into four
   tiles and the player rebuilds it by picking tiles; this board holds the four
   tiles of MISSING in a scrambled order. Vite copies this file out of `public/`
   verbatim, so it shares nothing with the app bundle and speaks plain DOM.

   The markup renders a complete, readable board on its own: every tile is a real
   button sitting in its slot, and the answer row and the reset control are inert
   or hidden until this script wires them up. */
;(() => {
  const ANSWER = 'MISSING'
  const TILE_COUNT = 4
  const RETURN_DELAY_MS = 800

  const word = document.querySelector('#word')
  const board = document.querySelector('#board')
  const reset = document.querySelector('#reset')
  const announcer = document.querySelector('#announcer')
  if (!word || !board || !reset || !announcer) return

  const tiles = [...board.querySelectorAll('.tile')]
  /** Each tile's board slot, so an unplaced tile always returns to the same cell. */
  const homes = new Map(tiles.map((tile) => [tile, tile.parentElement]))
  const staged = []
  let settling = false

  const stagedTiles = () => staged.map((tile) => tile.dataset.tile)
  const isSolved = () => stagedTiles().join('') === ANSWER
  const isFull = () => staged.length === TILE_COUNT

  function ghost() {
    const cell = document.createElement('span')
    cell.className = 'ghost'
    cell.setAttribute('aria-hidden', 'true')
    return cell
  }

  /** Puts the staged tiles in the answer row, every other tile back in its slot. */
  function render() {
    const gaps = Array.from({ length: TILE_COUNT - staged.length }, ghost)
    word.replaceChildren(...staged, ...gaps)

    for (const tile of tiles) {
      const home = homes.get(tile)
      if (!staged.includes(tile) && home.firstElementChild !== tile) home.append(tile)
    }

    /* A board with every tile picked has nothing left to show, so it steps out
       of the layout and the page stays as short as it started. */
    board.hidden = isFull()
    reset.hidden = staged.length === 0
  }

  /** Shakes the wrong word, then hands every tile back to the board. */
  function rejectWord(placed) {
    settling = true
    word.classList.add('is-wrong')
    announcer.textContent = `${stagedTiles().join(' ')} is not the word. Tiles returned.`

    setTimeout(() => {
      settling = false
      word.classList.remove('is-wrong')
      staged.length = 0
      render()
      placed.focus()
    }, RETURN_DELAY_MS)
  }

  function place(tile) {
    staged.push(tile)
    render()
    tile.focus()

    if (!isFull()) return
    if (isSolved()) word.classList.add('is-solved')
    else rejectWord(tile)
  }

  function takeBack(tile) {
    word.classList.remove('is-solved')
    staged.splice(staged.indexOf(tile), 1)
    render()
    tile.focus()
  }

  function toggle(tile) {
    if (settling) return
    if (staged.includes(tile)) takeBack(tile)
    else place(tile)
  }

  function clearBoard() {
    if (settling) return
    word.classList.remove('is-solved')
    staged.length = 0
    render()
    announcer.textContent = 'Tiles returned to the board.'
    tiles[0].focus()
  }

  for (const tile of tiles) {
    tile.addEventListener('click', () => {
      toggle(tile)
    })
  }

  reset.addEventListener('click', clearBoard)

  render()
})()
