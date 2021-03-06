import React, { useState } from 'react';
import { connect } from 'react-redux';
import { gql, useMutation } from '@apollo/client';

const POST_ANSWER = gql`
  mutation(
    $gameID: Int
    $player: String!
    $answer: String!
    $questionId: String!
  ) {
    answer(
      gameID: $gameID
      player: $player
      answer: $answer
      questionId: $questionId
    )
  }
`;

const Choice = ({ choice, player, questionId, room }) => {
  const [input, setInput] = useState({
    gameID: room,
    player: `${player}`,
    answer: `${choice}`,
    questionId: `${questionId}`,
  });

  const [answer, { loading, error }] = useMutation(POST_ANSWER);
  if (loading) return <p>Loading..</p>;
  if (error) return <p>An error occurred</p>;

  const onSend = (e) => {
    e.preventDefault();
    if (input.answer.length > 0) {
      answer({ variables: input });
    }
    setInput({
      ...input,
      answer: '',
    });
  };
  return (
    <>
      <button className="choice__button" onClick={(e) => onSend(e)}>
        {choice}
      </button>
    </>
  );
};

const mapStateToProps = (state) => ({
  player: state.game.player,
  room: state.game.room,
});

export default connect(mapStateToProps)(Choice);
