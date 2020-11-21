import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { gql, useMutation, useSubscription } from '@apollo/client';
import {
  startGame,
  enterQuestionPhase,
  exitQuestionPhase,
  setQuestionID,
} from '../actions/actions';
import Choice from './Choice';
import Answers from './Answers';

const delay = 30000;

const GET_GAME = gql`
  subscription($gameID: Int, $player: String) {
    gameMode(gameID: $gameID, player: $player) {
      id
      active
      question {
        id
        category
        title
        info
        answer
        choices
      }
      results {
        player
        answer
        questionId
        rightAnswer
      }
      players
      isQuestionPhase
    }
  }
`;

const START_SERVER = gql`
  mutation($gameID: Int, $player: String) {
    startGame(gameID: $gameID, player: $player)
  }
`;
// const PLAY_GAME = gql`
//   mutation {
//     playGame
//   }
// `;

function FormatText(props) {
  let info = props.info;
  info = info.replaceAll('\t', '\u00a0\u00a0');
  return info.split('\n').map((str) => <p className="quiz__text">{str}</p>);
}

const Quiz = ({ isGame, player, startGame, room }) => {
  const [counter, setCounter] = React.useState(0);
  const [playGame] = useMutation(START_SERVER);
  const { data, loading, error } = useSubscription(GET_GAME, {
    variables: { gameID: room, player: player },
  });

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  if (!player) return <Redirect to="/" />;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const newGame = async () => {
    // console.log(typeof room);
    playGame({ variables: { gameID: room, player: player } });
    startGame();
  };

  if (!isGame)
    return (
      <>
        <button className="question__button" onClick={() => newGame()}>
          Start quiz!
        </button>
        <h5 className="landing__rooms">Joined players</h5>
        <p>You ({player})</p>
      </>
    );

  if (loading) return <p>Loading..</p>;
  if (error) return <p>An error occurred</p>;
  const { active, results, question, isQuestionPhase, players } = data.gameMode;
  if (!question) return null;

  console.log(players, results);

  const filteredResults = results.filter((result) => result.rightAnswer);

  if (!active) {
    return (
      <>
        <div className="quiz">
          <h4 className="quiz__title">You did good! Here is your result...</h4>
          <p className="quiz__title">
            You got {filteredResults.length} points!{' '}
          </p>
          <h4 className="quiz__title"> Correct Answers</h4>
          {filteredResults.map((result) => (
            <p className="quiz__title">
              {filteredResults.length > 0 ? result.answer : 'None.. this time!'}{' '}
            </p>
          ))}
        </div>
        <button className="question__button" onClick={() => newGame()}>
          Play again?
        </button>
      </>
    );
  }

  return isQuestionPhase ? (
    <>
      <div className="quiz">
        {/* <div className="container"> */}
        <h4 className="quiz__title">{question.title}</h4>
        {/* <div className="container"> */}
        <FormatText info={question.info} />
        {/* </div> */}
        {/* </div> */}
      </div>
      <div className="quiz__choices">
        {' '}
        {question.choices.map((choice) => (
          <Choice choice={choice} questionId={question.id} key={choice} />
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="quiz">
        <h4 className="quiz__title">The correct answer is...🥁</h4>
        <p className="quiz__title" info>
          {question.answer}
        </p>
      </div>
      <Answers isQuestionPhase={isQuestionPhase} />
    </>
  );
};

const mapStateToProps = (state) => ({
  isGame: state.game.isGame,
  questionPhase: state.game.questionPhase,
  room: state.game.room,
  answerPhase: state.game.answerPhase,
  player: state.game.player,
  questionId: state.game.questionId,
});

export default connect(mapStateToProps, {
  startGame,
  enterQuestionPhase,
  exitQuestionPhase,
  setQuestionID,
})(Quiz);
