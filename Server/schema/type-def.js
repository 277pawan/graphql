const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearofPublication: Int!
    isInThreature: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input createUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }

  type Mutation {
    createUser(input: createUserInput!): User!
  }

  enum Nationality {
    SOUTHAFRICA
    PHILIPPINES
    MEXICO
    BRAZIL
    FRANCE
    INDONESIA
    NICARAGUA
    POLAND
  }
`;

module.exports = { typeDefs };
