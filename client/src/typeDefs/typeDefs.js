import { gql } from '@apollo/client';

export const GET_GAME = gql`
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

export const START_SERVER = gql`
  mutation($gameID: Int, $player: String) {
    startGame(gameID: $gameID, player: $player)
  }
`;

// const PLAY_GAME = gql`
//   mutation {
//     playGame
//   }
// `;
