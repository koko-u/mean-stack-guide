export const normalizePort = (val: string): number => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return -1
  }
  if (port < 0) {
    return -1
  }

  return port
}
