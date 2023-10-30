import { gql } from '@apollo/client'

export const typeDefs = gql`
  type ToDo {
    id: ID!
    title: String!
    description: String!
    date: String
  }
  input ToDoInput {
    title: String!
    description: String!
  }
  type Query {
    getToDo(toDoId: ID!): ToDo!
    getToDos: [ToDo!]!
  }
  type Mutation {
    createToDo(toDoInput: ToDoInput): Boolean
    updateToDo(toDoId: ID!, toDoInput: ToDoInput): ToDo
    deleteToDo(toDoId: ID!): Boolean
    deleteToDos: Boolean
  }
`;
