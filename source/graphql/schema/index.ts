import { buildSchema } from 'graphql';

export const graphQLSchema = buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
      }
      type User {
          _id: ID!
          email: String!
          password: String
          createdEvents: [Event!]
      }
      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String
      }
      input UserInput {
          email: String!
          password: String!
      }
      type RootQuery {
        all_events(email: String): [Event!]!
        one_event(_id: ID!): Event
        all_users(email: String): [User!]!
        one_user(userID: String): User
      }
      type RootMutation {
          create_event(eventInput: EventInput): Event
          create_user(userInput: UserInput): User
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
   `);
