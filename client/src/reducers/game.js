import {START, ENTER_QP, EXIT_QP, SET_PLAYER, TOGGLE_ANSWER, SET_QUESTION_ID} from '../actions/types';

const initState = {
    isGame: true, //Ska vara false
    questionPhase:false,
    room: 1337,
    answerPhase:false,
    questionId: null,
    player:"",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  };
  
  export default function reducer(state = initState, action) {
    console.log(state, action)
    switch (action.type) {
      case START: {
        return {
          ...state,
        };
      }
      case ENTER_QP: {
        return {
          ...state,
          questionPhase:true,
          answerPhase:false
        };
      }
      case EXIT_QP: {
        return {
          ...state,
          questionPhase:false
        };
      }
      case TOGGLE_ANSWER: {
        return {
          ...state,
          answerPhase:!state.answerPhase,
        };
      }
    
      case SET_PLAYER: {
        return {
          ...state,
          player: action.payload,
        };
      }
      case SET_QUESTION_ID: {
        return {
          ...state,
          questionId: action.payload,
        };
      }
      
      default: {
        return state;
      }
    }
  };
  