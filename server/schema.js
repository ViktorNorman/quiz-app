const { gql } = require('apollo-server');

const typeDefs = gql`
  type Question {
    id: ID!
    category: String
    title: String!
    info: String
    answer: String!
    choices: [String]!
  }

  type Answer {
    player: String!
    answer: String
    questionId: Int
    rightAnswer: Boolean
  }
  type Game {
    id: ID!
    active: Boolean
    questionAmount: Int
    isQuestionPhase: Boolean
    questions: [Question]
    question: Question
    results: [Answer]
    players: [String]
  }

  type Query {
    questions: [Question]!
    question(id: ID!): Question
    randomQuestion: Question
    answers: [Answer]
    gameMode: Game
  }

  type Mutation {
    answer(player: String!, answer: String!, questionId: String!): String
    startGame(gameID: Int, player: String): String
    joinGame: String
    endGame: String
  }

  type Subscription {
    answers: [Answer]
    gameMode(gameID: Int, player: String): Game
  }
`;

module.exports = typeDefs;
