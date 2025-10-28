import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

process.on('uncaughtException', (err) => {
  console.error('[bootstrap] uncaughtException', err)
})
process.on('unhandledRejection', (reason) => {
  console.error('[bootstrap] unhandledRejection', reason)
})

register('ts-node/esm', pathToFileURL('./'))
console.log('[bootstrap] ts-node ESM loader registered')

