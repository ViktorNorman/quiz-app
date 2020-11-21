import React from 'react';
import { connect } from 'react-redux';
import { useSubscription, gql } from '@apollo/client';

const GET_ANSWERS = gql`
  subscription {
    answers {
      player
      answer
      questionId
    }
  }
`;

const Answers = ({ questionId, isQuestionPhase }) => {
  const { data } = useSubscription(GET_ANSWERS);
  if (!data) return null;

  return isQuestionPhase ? (
    <div className="answers">
      {/* {data.answers && data.answers.map(el => <p className="answer" key={el.player + Math.floor(Math.random() * 1000)}>{el.player} has answered!</p>)}  */}
    </div>
  ) : (
    <div className="answers">
      {data.answers &&
        data.answers.map((el) => (
          <p
            className="answer"
            key={el.player + Math.floor(Math.random() * 1000)}
          >
            You answered: {el.answer}!
          </p>
        ))}
    </div>
  );
};

export default connect()(Answers);
