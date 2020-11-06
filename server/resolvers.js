const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const getData = async () =>{
    const db = await readFile('db.json');
    const json = await db.toString();
    return JSON.parse(json);
};
let answers = [];
const allAnswers =[];
const subscribers = [];
const onAnswersUpdates = (fn) => subscribers.push(fn);
const delay = 20000;
let currentQuestion =[];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const questionPhase = async (start) => {
    console.log('questionPhase');
    let time = start;
   
    // const questions = await getData();
    // // console.log(questions[Math.floor(Math.random() * questions.length)])
    // currentQuestion = [questions[Math.floor(Math.random() * questions.length)]]

    // let currentAnswer = answers.filter(answer => answer.questionId === game.questions[0].id.toString())

    // console.log(currentAnswer)
    while(time < start+delay+1000 && answers.length < 1){
        // console.log("in time loop")
        await sleep(1000);
        time = Date.now()
        // console.log(time)
        // console.log(answers.length)
        // console.log(answers)
    }
    // console.log("OUTSIDE")
};
const answerPhase = async (start) => {
    console.log('answerPhase');
    // let start = Date.now()
    let time = start;
    while(time < start+((delay+1000)/6)){
        await sleep(1000);
        time = Date.now()
        // console.log(time)
    }


    answers.forEach(answer => {
    answer.rightAnswer = false;
    if(answer.answer === game.question.answer){
     answer.rightAnswer= true;
    }
    })
     
    allAnswers.push(answers);
    answers =[];
};

const game = {
    id:1337,
    active: true,
    isQuestionPhase:true,
    questionAmount: 3,
    questions: [],
    question: null,
    results: []
}
 
module.exports = {
    Query: {
        questions: async () => await getData(),
        question: async (_, {id}, __) => await getData()
        .filter(question => parseInt(question.id) === parseInt(id))[0],
        randomQuestion: async () => {
            const questions = await getData();
            return questions[Math.floor(Math.random() * questions.length)];
          },
        answers: () => answers,
        game: () => game,
        
    },
    Mutation:{
        answer: (_, {player, answer, questionId}, __) =>{
            answers.push({player, answer, questionId})
            subscribers.forEach(fn => fn())
            return "Answer Received!"
        },
        startGame: async () =>{
           console.log("Game started")
           game.active = true;
           const questions = await getData()
        //    game.questions = questions;

           for(let i = 0; i < game.questionAmount; i++){
        //   let currentQuestion = questions[i]
           game.isQuestionPhase = true;
           game.question = questions[i];
           subscribers.forEach(fn => fn())
        //    console.log(game)
           await questionPhase(Date.now())
           game.isQuestionPhase = false;
        //    console.log(game)
           subscribers.forEach(fn => fn())
           await answerPhase(Date.now())
           }

        //    console.log(allAnswers.flat())

        //    allAnswer = allAnswers.flat().sort(answer => answer.player )
           game.results = allAnswers.flat()

           game.active = false;

           console.log(game)

           subscribers.forEach(fn => fn())
        //        let currentQuestion = questions[Math.floor(Math.random() * questions.length)]
        //        game.questions = [currentQuestion];
        //         // let currentQuestion = [questions[Math.floor(Math.random() * questions.length)]]
        //         // game.questions = currentQuestion;
        //    }
            //   game.questions = questions
        //    update()
           
           return "Game Finished"
           //    return game
        },
        playGame: async () =>{
            console.log("update")
           await update()
           game.question = currentQuestion;
           subscribers.forEach(fn => fn())
            // console.log(game)
            // const update = update()
           
        //    game.questions = questions
        //    subscribers.forEach(fn => fn())
           return "Game updated"
        //    return game
        },
    },
    
    Subscription: {
        answers: {
            subscribe: (_, __, {pubsub}) => {
                console.log(answers)
                const room = '1337';
                onAnswersUpdates(() => pubsub.publish(room, {answers}))
                setTimeout(() => pubsub.publish(room, {answers}),0)
            return pubsub.asyncIterator(room)
            }
        },
        game: {
            subscribe: (_, __, {pubsub}) => {
            console.log("SUB")
            console.log(game)
            const room = '1333';   
            onAnswersUpdates(() => pubsub.publish(room, {game}))
            setTimeout(() => pubsub.publish(room, {game}),0)
            return pubsub.asyncIterator(room)
        }
    }
  }
  }

