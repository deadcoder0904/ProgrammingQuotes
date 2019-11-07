const {GraphQLServer} = require('graphql-yoga');
const {join} = require('path');
const {
  makeSchema,
  objectType,
  queryType,
  mutationType,
  stringArg,
} = require('nexus');
const {Photon} = require('@generated/photon');
const {nexusPrismaPlugin} = require('nexus-prisma');

const photon = new Photon();

const Quote = objectType({
  name: 'Quote',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.author();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.quotes();
    t.list.field('filterQuotesByAuthor', {
      type: 'Quote',
      args: {
        author: stringArg(),
      },
      resolve: (_, {author}, ctx) => {
        return ctx.photon.quotes.findMany({
          where: {
            author: {contains: author},
          },
        });
      },
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneQuote({alias: 'createQuote'});
    t.crud.deleteOneQuote({alias: 'deleteQuote'});
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Quote],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
    ],
  },
});

const server = new GraphQLServer({
  schema,
  context: request => {
    return {
      ...request,
      photon,
    };
  },
});

server.start(() =>
  console.log(
    '🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#6-using-the-graphql-api',
  ),
);

module.exports = {Quote};
