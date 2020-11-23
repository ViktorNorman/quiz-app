const Game = require('./game');
const fs = require('fs');
const { subscribe } = require('graphql');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const getData = async () => {
  const db = await readFile('db.json');
  const json = await db.toString();
  return JSON.parse(json);
};

const subscribers = [];
const onAnswersUpdates = (fn) => subscribers.push(fn);
const activeGames = [];
const isActiveGame = (id) => activeGames.filter((el) => el.id === id)[0];

module.exports = {
  Subscription: {
    answers: {
      subscribe: (_, { gameID }, { pubsub }) => {
        const id = gameID;
        const activeGame = isActiveGame(id);
        const answers = activeGame.answers;
        onAnswersUpdates(() => pubsub.publish(`Answers ${id}`, { answers }));
        setTimeout(() => pubsub.publish(`Answers ${id}`, { answers }), 0);
        return pubsub.asyncIterator(`Answers ${id}`);
      },
    },
    //add withfilter??
    gameMode: {
      subscribe: (_, { gameID, player, host }, { pubsub }) => {
        const id = gameID;
        let activeGame = isActiveGame(id);
        if (!player || !id) return;
        if (activeGame && !host) {
          activeGame.addPlayer(player);
          console.log(`Client ${player} connected as "join" to ${id}`);
        } else if (!activeGame && host) {
          activeGame = new Game(id, player, host);
          console.log(`Client ${player} connected as "host" to ${id}`);
          activeGames.push(activeGame);
        } else {
          console.log(`Error`);
          return 'Error';
        }
        console.log(activeGame);
        pubsub.publish(`Game ${activeGame.id}`, { gameMode: activeGame });
        // pubsub.publish(`Game ${activeGame.id}`, { gameMode: activeGame }, 0);
        return pubsub.asyncIterator(`Game ${activeGame.id}`);
      },
    },
    timer: {
      subscribe: (_, { id }, { pubsub }) => {
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
    answer: (_, { gameID, player, answer, questionId }, __) => {
      const activeGame = isActiveGame(gameID);
      //   activeGame.playerAnswer(player, answer, questionId);
      let playerAnsweredAlready = activeGame.answers.findIndex(
        (answer) => answer.player === player && answer.questionId === questionId
      );
      if (playerAnsweredAlready === -1) {
        activeGame.answers.push({ player, answer, questionId });
        subscribers.forEach((fn) => fn());
        return 'Answer Received!';
      }
      return 'Duplicate answers!';
    },
    startGame: async (_, { gameID, player }, { pubsub }) => {
      const id = gameID;
      const activeGame = isActiveGame(id);
      if (!activeGame) return 'no game with provided id found';
      console.log(`Game ${activeGame.id} started`);
      activeGame.active = true;
      const questions = await getData();
      pubsub.publish(`Game ${activeGame.id}`, { gameMode: activeGame });
      for (let i = 0; i < activeGame.questionAmount; i++) {
        activeGame.isQuestionPhase = true;
        activeGame.question = questions[i];
        pubsub.publish(`Game ${activeGame.id}`, { gameMode: activeGame });
        await activeGame.questionPhase(Date.now());
        activeGame.isQuestionPhase = false;
        pubsub.publish(`Game ${activeGame.id}`, { gameMode: activeGame });
        await activeGame.answerPhase(Date.now());
      }
      activeGame.results = activeGame.allAnswers.flat();
      console.log(activeGame.results);
      pubsub.publish(`Game ${activeGame.id}`, { gameMode: activeGame });
      await activeGame.displayResultsPhase(Date.now());
      activeGame.active = false;
      activeGame.players = [];
      activeGame.result = [];
      pubsub.publish(`Game ${activeGame.id}`, { gameMode: activeGame });
      console.log('Game Finished');
      return 'Game Finished';
    },
  },
};
