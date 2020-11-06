import {START, ENTER_QP, EXIT_QP, SET_PLAYER, TOGGLE_ANSWER, SET_QUESTION_ID} from './types';
export const startGame = () => async (dispatch) => {
      dispatch({
        type: START,
      });

      // function sleep(ms) {
      //   return new Promise(resolve => setTimeout(resolve, ms));
      // }
      
      // async function delayedGreeting() {
      //   console.log("Hello");
      //   await sleep(2000);
      //   console.log("World!");
      //   await sleep(2000);
      //   console.log("Goodbye!");
      // }
      
      // delayedGreeting();
      // dispatch({
      //   type: ENTER_QP,
      //   payload: id,
      // });
  };
  
export const enterQuestionPhase = (questionId) => (dispatch) => {
  dispatch({
    type: ENTER_QP,
    payload: questionId,
  });
  };
export const exitQuestionPhase = () => (dispatch) => {
      dispatch({
        type: EXIT_QP
      });
      dispatch({
        type: TOGGLE_ANSWER,
      });
  };

export const setPlayer = (name) => (dispatch) => {
      dispatch({
        type: SET_PLAYER,
        payload: name,
      });
  };
export const showAnswer = () => (dispatch) => {
      dispatch({
        type: TOGGLE_ANSWER,
      });
  };
export const setQuestionID = (questionId) => (dispatch) => {
      dispatch({
        type: SET_QUESTION_ID,
        payload: questionId,
      });


  };