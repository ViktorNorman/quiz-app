import React,{useState} from 'react'
import { connect } from "react-redux";
import {
  gql,
  useMutation,
} from '@apollo/client';

const POST_ANSWER = gql`
  mutation($player: String!, $answer:String!, $questionId:String!){
    answer(player: $player, answer: $answer, questionId: $questionId) 
  }
`;

const InputField = ({player,questionId}) => {
    const [input, setInput] = useState({
    player: `${player}`,
    answer: '',
    questionId: `${questionId}`,
  });

  const [answer, {loading, error}] = useMutation(POST_ANSWER);
  if (loading) return <p>Loading..</p>;
  if (error) return <p>An error occurred</p>;

  const onSend = (e) => {
    e.preventDefault();
    if (input.answer.length > 0) {
      answer({variables: input})
      //Hide button + input till next question?
      //Show own answer and the players that have answered
    }

    setInput({
      ...input,
      answer: '',
    });
  };
  return (
            <div className="input-field">
                <p> {player}</p>
                <form onKeyUp={e => {
                    if(e.key === 13)onSend();
                }}>
                <input className="input-field__answer" value={input.answer} onChange={e => setInput({...input, answer:e.target.value})}/>
                <button className="input-field__button" onClick={(e)=> onSend(e)}>Send</button>
                </form>
            </div>
        )
}

const mapStateToProps = (state) =>({
  player:state.game.player,
  questionId: state.game.questionId,
});

export default connect(mapStateToProps)(InputField);
