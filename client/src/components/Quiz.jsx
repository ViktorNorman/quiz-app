import React, { useState } from 'react';
import { connect, compose } from "react-redux";
import {
  useQuery,
  gql
} from '@apollo/client';
import { startGame, enterQuestionPhase, exitQuestionPhase, setQuestionID } from '../actions/actions';
import { Redirect } from "react-router-dom";

const delay= 5000;

const GET_RANDOM_QUESTION = gql`
  query {
    randomQuestion {
      id
      category
      title
      info
      answer
    }
  }
`;

function NewlineText(props) {
    const info = props.info;
    return info.split('\n').map(str => <p className="info">{str}</p>);
  }

// Frågor

// const Questions = () => {
//   const { data } = useQuery(GET_QUESTIONS);
//   if (!data) return null;

//   return (
//     <>
//       {data.questions.map(({ id, question, info, answer}) => (
//         <div className="questions" key={id}>
//           <div>{question}</div>
//           <NewlineText info={info} />
//         </div>
//       ))}
//     </>
//   );
// };
const Quiz = ({isGame,questionPhase,room, player, enterQuestionPhase, exitQuestionPhase, answerPhase, setQuestionID}) => {

  // useEffect(() => {
  //   //start game

  // }, [])
  const startQuestionPhase = () =>{
    enterQuestionPhase();
    const test = () =>{
      exitQuestionPhase();
    }
    setTimeout(test, delay);
  }

  const { data, loading } = useQuery(GET_RANDOM_QUESTION);

  if (!isGame || !player)return <Redirect to="/" />;

  if (!data) return null;
  
  const { title, info, answer, id } = data.randomQuestion;
  setQuestionID(id);
  // console.log(info)

  if (answerPhase) {
    return (
      <div className="question">
        <h5 className="question__title">Correct answer is...</h5>
          <p className="className="info>{answer}</p>
        <button className="question__button" onClick={startQuestionPhase}>Give us a new question!</button>
        </div>
    )
  }
  
  return questionPhase && !loading ? (
        <div className="question">
          <h5 className="question__title">{title}</h5>
          <NewlineText info={info} />
        </div>
  ): (<button className="question__button" onClick={startQuestionPhase}>Give us a question!</button>);
};

const mapStateToProps = (state) =>({
    isGame: state.game.isGame,
    questionPhase:state.game.questionPhase,
    room: state.game.room,
    answerPhase: state.game.answerPhase,
    player:state.game.player,
});

export default connect(mapStateToProps, {enterQuestionPhase, exitQuestionPhase, setQuestionID})(Quiz);

// const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);

// // use withApollo enhancer as a HOC
// export default compose(reduxWrapper, withApollo)(client);