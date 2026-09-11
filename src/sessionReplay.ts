import { addIntegration, replayIntegration } from '@sentry/vue'

/**
 * Starts Sentry session replay recording.
 *
 * Replay is the heaviest part of the Sentry SDK and records nothing the first paint
 * depends on, so it lives in its own chunk that the entry point pulls in once the app
 * is mounted. Sampling still comes from the rates passed to `Sentry.init`.
 */
export default function startSessionReplay(): void {
  addIntegration(replayIntegration({ maskAllText: true, blockAllMedia: true }))
}
