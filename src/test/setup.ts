// Mock localStorage before any modules are imported
// This is needed for Vue Devtools which tries to access localStorage during import
if (
  typeof globalThis.localStorage === 'undefined' ||
  typeof globalThis.localStorage.getItem !== 'function'
) {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
      length: 0,
      key: () => null,
    },
    writable: true,
    configurable: true,
  })
}
