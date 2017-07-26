import React from 'react';
import PropTypes from 'prop-types';

import { Players } from './../api/players';

export default class AddPlayer extends React.Component{

    handleSubmit = (e) => {
    let playerName = e.target.playerName.value;
    console.log("Player name is " + playerName);
    e.preventDefault();

    if (playerName) {
        e.target.playerName.value = '';

        Players.insert({
            name: playerName,
            score: this.props.score
        });
    }
};

    render(){
        return(
             <div>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <input type="text" name="playerName" placeholder="Player name" />
                    <button>Add Player</button>
                </form>
            </div>
        );
    }
}

AddPlayer.propTypes = {
  score:  PropTypes.number.isRequired
};

AddPlayer.defaultProps ={
    score: 0
};