const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const getData = async () =>{
    const db = await readFile('db.json');
    const json = await db.toString();
    return JSON.parse(json);
};
const answers = [];

module.exports = {
    Query: {
        questions: async () => await getData(),
        question: async (_, {id}, __) => await getData()
        .filter(question => parseInt(question.id) === parseInt(id))[0],
        randomQuestion: async () => {
            const questions = await getData();
            return questions[Math.floor(Math.random() * questions.length)];
          },
    },
    Mutation:{
        answer: (_, {player, answer, questionId}, __) =>{
            answers.push({player, answer, questionId})
            console.log("answers", answers);
            return "Answer Received!"
        }
   // newGame?
    //Answers? All players answers combined into a list through subscriptions? maybe a list of objects, [{p1: "grön"}, {p2:""}, {p3:"röd"}]
},

// Subscription: {
//     newGame: {
//         subscribe: (_, __, {pubsub}) => pubsub.asyncIterator("Room")
//     }
//   }
}
