const fs = require('fs');
const { subscribe } = require('graphql');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const getData = async () => {
  const db = await readFile('db.json');
  const json = await db.toString();
  return JSON.parse(json);
};
let answers = [];
const allAnswers = [];
const subscribers = [];
const onAnswersUpdates = (fn) => subscribers.push(fn);
const delay = 20000;
let currentQuestion = [];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const questionPhase = async (start, pubsub, gameID) => {
  console.log('questionPhase');
  let time = start;
  game.count = (delay + 1000) / 1000;
  while (time < start + delay + 1000 && answers.length < game.players.length) {
    await sleep(1000);
    time = Date.now();
    // console.log(time);
    game.count--;
    console.log(game.count);
    // pubsub.publish(`Timer ${game.id}`, { count });
    // pubsub.publish(`Game ${gameID}`, { game });
  }
};
const answerPhase = async (start) => {
  console.log('answerPhase');
  let time = start;
  while (time < start + (delay + 1000) / 6) {
    await sleep(1000);
    time = Date.now();
  }

  answers.forEach((answer) => {
    answer.rightAnswer = false;
    if (answer.answer === game.question.answer) {
      answer.rightAnswer = true;
    }
  });

  allAnswers.push(answers);
  answers = [];
};

const game = {
  id: 1337,
  active: false,
  isQuestionPhase: true,
  questionAmount: 3,
  questions: [],
  question: null,
  results: [],
  players: [],
  count: 0,
};

module.exports = {
  Subscription: {
    answers: {
      subscribe: (_, __, { pubsub }) => {
        onAnswersUpdates(() =>
          pubsub.publish(`Answers ${game.id}`, { answers })
        );
        setTimeout(() => pubsub.publish(`Answers ${game.id}`, { answers }), 0);
        return pubsub.asyncIterator(`Answers ${game.id}`);
      },
    },
    //add withfilter??
    gameMode: {
      subscribe: (_, { gameID, player }, { pubsub }) => {
        game.id = gameID;
        if (player && !game.players.includes(player)) {
          console.log(`Client ${player} connected to ${gameID}`);
          game.players.push(player);
        }
        pubsub.publish(`Game ${game.id}`, { gameMode: game });
        // console.log(`Connected players: ${game.players}`);
        return pubsub.asyncIterator(`Game ${gameID}`);
      },
    },
    timer: {
      subscribe: (_, { gameID }, { pubsub }) => {
        console.log('subscribed');
        return pubsub.asyncIterator(`Timer ${game.id}`);
      },
    },
  },
  Query: {
    questions: async () => await getData(),
    question: async (_, { id }, __) =>
      await getData().filter(
        (question) => parseInt(question.id) === parseInt(id)
      )[0],
    randomQuestion: async () => {
      const questions = await getData();
      return questions[Math.floor(Math.random() * questions.length)];
    },
    answers: () => answers,
    gameMode: () => game,
  },
  Mutation: {
    answer: (_, { player, answer, questionId }, __) => {
      let playerAnsweredAlready = answers.findIndex(
        (answer) => answer.player === player && answer.questionId === questionId
      );
      if (playerAnsweredAlready === -1) {
        answers.push({ player, answer, questionId });
        subscribers.forEach((fn) => fn());
        return 'Answer Received!';
      }
      return 'Duplicate answers!';
    },
    startGame: async (_, { gameID, player }, { pubsub }) => {
      if (gameID !== game.id) return 'no game with provided id found';
      console.log(`Game ${game.id} started`);
      game.active = true;
      const questions = await getData();
      pubsub.publish(`Game ${game.id}`, { gameMode: game });
      for (let i = 0; i < game.questionAmount; i++) {
        game.isQuestionPhase = true;
        game.question = questions[i];
        pubsub.publish(`Game ${game.id}`, { gameMode: game });
        await questionPhase(Date.now(), pubsub, gameID);
        game.isQuestionPhase = false;
        pubsub.publish(`Game ${game.id}`, { gameMode: game });
        await answerPhase(Date.now());
      }
      game.results = allAnswers.flat();
      game.active = false;
      pubsub.publish(`Game ${game.id}`, { gameMode: game });
      game.players = [];
      console.log('Game Finished');
      return 'Game Finished';
    },
  },
};
