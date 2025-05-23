# Fourtiles

Fourtiles is a word-based puzzle game where the player constructs words by
combining a set of 20 tiles from a board. The board are generated by splitting
five different words, called "fourtiles", into four tiles each. The player
receives starts for each fourtile they reconstruct, and additional points for
other words they can make by combining two or more tiles. The five "fourtile"
words are the only words in the board constructible from four tiles. No words
are constructible from five or more tiles.

Approximately 4,000 possible games are pre-generated and stored in
`src/data/games.json`. The tool that generates these games is at
https://github.com/Fourtiles/GameGenerator.

## Installation

Fourtiles is a Vue.js 3 application using Yarn as its package manager. After
cloning the repository, simply run `yarn install` to install all dependencies.
The game can be run with `yarn run dev`.

## Architecture

Game information is stored using Pinia, in a store defined in
`src/stores/game.ts`. Within that store, the `game` property stores the
non-variable game information, and the other properties store the variable game
data. Pinia has been configured to continually sync game data with local
storage. Navigating to the website will resume a game in progress if one has
been stored.

A Mitter bus is used to propagate game events to different components. The
events are defined in `src/emitters/gameBus.ts`.

The `App.vue` component is the entry point for the application. It downloads the
`games.json` file and selects a random game if needed. It also listens to the
the game bus, and fires confetti and other special effects when the user finds
all fourtiles or completes the game.

## Testing

Unit tests are provided for only those components with sufficiently complex
logic. Run unit tests with `yarn run test:unit`.

Cypress end-to-end tests are provided that test the entire game flow. Run
end-to-end tests with `yarn run test:e2e:dev` (interactive environment) or
`yarn run test:e2e` (command-line output only). 

## Linting

`yarn run lint` will lint all JavaScript and TypeScript files.
`yarn run type-check` will type-check all TypeScript files. `yarn run format`
will reformat all files according to the Prettier ruleset.

## Deployment

CI and deployment is managed automatically by GitHub Actions. When the `main`
branch is pushed, the `ci.yml` flow runs all linter and type checks, and if
those pass, then Actions runs `yarn build` to generate the production build. The
production build is then automatically uploaded to GitHub Pages for hosting.
