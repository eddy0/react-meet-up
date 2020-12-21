export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const log = console.log.bind(console)

