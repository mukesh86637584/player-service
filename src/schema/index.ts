// schema.ts
import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Player {
    id: ID!
    firstname: String!
    lastname: String!
    shortname: String!
    sex: String!
    country: Country!
    picture: String!
    data: Stats!
  }

  type Country {
    picture: String!
    code: String!
  }

  type Stats {
    rank: Int!
    points: Int!
    weight: Int!
    height: Int!
    age: Int!
    last: [Int!]!
  }

  type Query {
    players: [Player!]!
    player(id: ID!): Player
  }
`;