export const onError = (port: number) => {
  return (err: any) => {
    if (err.syscall !== 'listen') {
      throw err
    }

    switch (err.code) {
      case 'EACCES':
        console.error(`port: ${port} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(`port: ${port} is already in use`)
        process.exit(1)
        break
      default:
        throw err
    }
  }
}
