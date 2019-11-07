const {Photon} = require('@generated/photon');
const photon = new Photon();
const quotes = require('./quotes.json');

async function main() {
  for await (let quote of quotes) {
    const {content, author} = quote;
    await photon.quotes.create({
      data: {
        author,
        content,
      },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
