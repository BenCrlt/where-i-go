import { Context, context } from "./context";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";

const initServer = async () => {
  const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
    plugins: [PrismaPlugin],
    prisma: { client: context().db },
  });

  const schema = await builder.toSchema();

  const server = new ApolloServer<Context>({ schema, context });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

initServer();
