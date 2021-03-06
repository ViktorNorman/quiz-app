import {
  START,
  ENTER_QP,
  EXIT_QP,
  SET_PLAYER,
  TOGGLE_ANSWER,
  SET_QUESTION_ID,
} from './types';
export const startGame = () => async (dispatch) => {
  dispatch({
    type: START,
  });
};

export const enterQuestionPhase = (questionId) => (dispatch) => {
  dispatch({
    type: ENTER_QP,
    payload: questionId,
  });
};
export const exitQuestionPhase = () => (dispatch) => {
  dispatch({
    type: EXIT_QP,
  });
  dispatch({
    type: TOGGLE_ANSWER,
  });
};

export const setPlayer = (payload) => (dispatch) => {
  dispatch({
    type: SET_PLAYER,
    payload,
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
