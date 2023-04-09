import Server from './app'

async function main() {
  const server = new Server()
  await server.start()
}

main()
