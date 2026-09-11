/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string
  readonly VITE_SENTRY_RELEASE: string
}

declare module 'virtual:game-shards' {
  /** Number of game records across every shard file. */
  export const gameCount: number
  /** Number of game records each shard file holds. */
  export const shardSize: number
}
