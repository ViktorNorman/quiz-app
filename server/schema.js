const { gql } = require('apollo-server');

const typeDefs = gql`
    type Question {
            id:ID!
            category:String
            title:String!
            info:String
            answer:String!
            choices: [String]!
        }
   
        type Answer {
            player: String!
            answer: String
            questionId: Int
            rightAnswer: Boolean
        }
    type Game {
        id:ID!
        active: Boolean
        questionAmount: Int
        isQuestionPhase: Boolean
        questions: [Question]
        question: Question
        results: [Answer]
    }
        
    type Query {
        questions: [Question]!
        question(id:ID!): Question
        randomQuestion: Question
        answers: [Answer]
        game:Game
    }
    
    type Mutation {
            answer(player: String!, answer: String!, questionId: String!): String
            startGame:String
            playGame:String
            endGame:String
        }

    type Subscription {
            answers: [Answer]
            game:Game
        }
`;

module.exports = typeDefs;