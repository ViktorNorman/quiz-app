import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Banner from './Banner';
import { setPlayer } from '../actions/actions';

const Landing = ({ room, setPlayer }) => {
  const [playerName, setPlayerName] = useState('');
  // const [playerName, setPlayerName] = useState('');
  console.log(room);
  const hostGame = () => {
    console.log('hostGame');
    //Slumpa ett namn?
    const payload = { name: playerName, host: true };
    console.log(payload);
    setPlayer(payload);
    // create a new game
    // let game = newGame();
    //publish subscription to game
    // redirect to /host or /host/roomnumber?
  };
  const joinGame = () => {
    //set id and use for player
    const payload = { name: playerName, host: false };
    setPlayer(payload);
  };
  return (
    <div className="landing">
      <Banner />
      <p className="landing__text"> Enter player name</p>
      <input
        className="landing__player"
        value={playerName}
        required
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <section className="landing__selection">
        <Link to={`/game/${room}`} className="landing__alternative">
          <button className="landing__button" onClick={hostGame}>
            Host a game
          </button>
        </Link>

        <p>Or join a room below...</p>
        <h5 className="landing__rooms">Active rooms</h5>
        <div className="landing__room">
          <Link to={`/game/${room}`} className="landing__alternative">
            <button className="landing__button" onClick={joinGame}>
              Join room {room}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  room: state.game.room,
});

export default connect(mapStateToProps, { setPlayer })(Landing);
