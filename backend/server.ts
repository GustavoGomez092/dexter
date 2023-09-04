import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";

const schema = await buildSchema({
  resolvers,
});

const server = new ApolloServer({
  schema,
  introspection: true,
});

export default server;
