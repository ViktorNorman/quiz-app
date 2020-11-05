import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import Banner from './Banner'
import {setPlayer} from '../actions/actions';

const newGame = () => {


}

const Landing = ({room, setPlayer}) => {
    const [playerName, setPlayerName] = useState('');
    // const [roomnumber, setRoomNumber] = useState(null);

    const hostGame = () => {
        console.log("hostGame")
        console.log(playerName)
        setPlayer(playerName)
        // create a new game
        // let game = newGame();
        //publish subscription to game
        // redirect to /host or /host/roomnumber?
    }
    const joinGame = () => {
        console.log("joinGame")
        setPlayer(playerName)
        // console.log(roomnumber)

        //join subscription to game
        // redirect to /join or /join/roomnumber?
    }
    return (
        <div className="landing">
           <Banner/> 
           <label> Enter player name</label>
           <input className="landing__player" value={playerName} required onChange={e => setPlayerName(e.target.value)}/>
           {/* <section className="landing__selection"> */}
           {/* <Link to="/host" className="landing__alternative"> */}
              <button onClick={hostGame}>Host a game</button>
            {/* </Link> */}
           {/* <input className="landing__player" value={roomnumber} required onChange={e => setRoomNumber(e.target.value)}/>
           */}
            <p>Or join a room below...</p>
            <h5>Active rooms</h5>
            <div className="landing__room">
                <Link to="/join" className="landing__alternative">
                <button onClick={joinGame}>Join room {room}</button>
                </Link>
            </div>
           {/* </section> */}
        </div>
    )
}

const mapStateToProps = (state) =>({
    isGame: state.game.isGame,
    questionPhase:state.game.questionPhase,
    room: state.game.room
});
  
  export default connect(mapStateToProps, {setPlayer})(Landing);
