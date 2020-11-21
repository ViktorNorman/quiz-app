import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMutation, useSubscription } from '@apollo/client';

import Choice from './Choice';
import Answers from './Answers';
import {
  startGame,
  enterQuestionPhase,
  exitQuestionPhase,
  setQuestionID,
} from '../actions/actions';
import { START_SERVER, GET_GAME } from '../typeDefs/typeDefs';

function FormatText(props) {
  let info = props.info;
  info = info.replaceAll('\t', '\u00a0\u00a0');
  return info.split('\n').map((str) => <p className="quiz__text">{str}</p>);
}

//add routing if one of the players have started the game? Or perhaps only Host can start?
const Quiz = ({ isGame, player, startGame, room, host }) => {
  const [playGame] = useMutation(START_SERVER);
  const { data, loading, error } = useSubscription(GET_GAME, {
    variables: { gameID: room, player: player },
  });

  if (!player) return <Redirect to="/" />;
  if (loading) return <p>Loading..</p>;
  if (error) return <p>An error occurred: {error}</p>;
  const { active, results, question, isQuestionPhase, players } = data.gameMode;

  const newGame = async () => {
    playGame({ variables: { gameID: room, player: player } });
    startGame();
  };
  const ready = async () => {
    console.log('ready');
  };
  const leaveGame = async () => {
    console.log('leaveGame');
  };
  console.log(data);

  if (!active)
    return host ? (
      <>
        <button className="question__button" onClick={() => newGame()}>
          Start quiz!
        </button>
        <button className="question__button" onClick={() => leaveGame()}>
          Leave game
        </button>
        <h5 className="landing__rooms">Joined players</h5>
        {players.map((p) => (
          <p>{p === player ? `${p}(You)` : p}</p>
        ))}
      </>
    ) : (
      <>
        <button className="question__button" onClick={() => ready()}>
          Ready to play
        </button>
        <button className="question__button" onClick={() => leaveGame()}>
          Leave game
        </button>
        <h5 className="landing__rooms">Joined players</h5>
        {players.map((p) => (
          <p>{p === player ? `${p}(You)` : p}</p>
        ))}
      </>
    );

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

  if (!question) return null;
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
  // isGame: state.game.isGame,
  // questionPhase: state.game.questionPhase,
  room: state.game.room,
  // answerPhase: state.game.answerPhase,
  player: state.game.player,
  questionId: state.game.questionId,
  host: state.game.host,
});

export default connect(mapStateToProps, {
  startGame,
  enterQuestionPhase,
  exitQuestionPhase,
  setQuestionID,
})(Quiz);
