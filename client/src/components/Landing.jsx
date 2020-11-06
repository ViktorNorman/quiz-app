import React, {useState} from 'react'
import { Link} from 'react-router-dom';
import { connect } from "react-redux";
import Banner from './Banner'
import {setPlayer} from '../actions/actions';


const Landing = ({room, setPlayer}) => {
    const [playerName, setPlayerName] = useState('');
    // const hostGame = () => {
    //     console.log("hostGame")
    //     console.log(playerName)
    //     setPlayer(playerName)
    //     // create a new game
    //     // let game = newGame();
    //     //publish subscription to game
    //     // redirect to /host or /host/roomnumber?
    // }
    const joinGame = () => {
        setPlayer(playerName)
    }
    return (
        <div className="landing">
           <Banner/> 
           <p className="landing__text"> Enter player name</p>
           <input className="landing__player" value={playerName} required onChange={e => setPlayerName(e.target.value)}/>
           {/* <section className="landing__selection"> */}
           {/* <Link to="/host" className="landing__alternative"> */}
              {/* <button onClick={hostGame}>Host a game</button> */}
            {/* </Link> */}
           {/* <input className="landing__player" value={roomnumber} required onChange={e => setRoomNumber(e.target.value)}/>
           */}
            {/* <p>Or join a room below...</p> */}
            <h5 className="landing__rooms">Active rooms</h5>
            <div className="landing__room">
                <Link to="/join" className="landing__alternative">
                <button className="landing__button" onClick={joinGame}>Join room {room}</button>
                </Link>
            </div>
           {/* </section> */}
        </div>
    )
}

const mapStateToProps = (state) =>({
    room: state.game.room
});
  
  export default connect(mapStateToProps, {setPlayer})(Landing);
