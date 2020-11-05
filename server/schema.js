const { gql } = require('apollo-server');

const typeDefs = gql`
    type Question {
            id:ID!
            category:String
            title:String!
            info:String
            answer:String!
        }
   
    type Game {
        id:ID!
        activeGame: Boolean
        questionPhase: Boolean
        answers: [Answer]
        results: [String]
    }
    type Answer {
        player: String!
        answer: String
        questionId: Int
    }
        
    type Query {
        questions: [Question]!
        question(id:ID!): Question
        randomQuestion: Question
    }
    
    type Mutation {
            answer(player: String!, answer: String!, questionId: String!): String
        }

    type Subscription {
            newGame: Game!
        }
`;

module.exports = typeDefs;