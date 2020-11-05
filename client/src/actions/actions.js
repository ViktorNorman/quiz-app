import {START, ENTER_QP, EXIT_QP, SET_PLAYER, TOGGLE_ANSWER, SET_QUESTION_ID} from './types';
export const startGame = () => (dispatch) => {
      dispatch({
        type: START,
      });
   
  };
  
export const enterQuestionPhase = () => (dispatch) => {
      dispatch({
        type: ENTER_QP
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