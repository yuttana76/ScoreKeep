
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Players } from './../imports/api/players';
import TitleBar from './../imports/ui/TitleBar';
import AddPlayer from './../imports/ui/AddPlayer';

const renderPlayers = (playerList) => {
    return playerList.map((player) => {
        return (
            <p key={player._id}>
                {player.name} has {player.score} point(s).
                <button onClick={() => {
                    Players.update(player._id, { $inc: { score: -1 } });
                }}>-1</button>

                <button onClick={() => {
                    Players.update(player._id, { $inc: { score: 1 } });
                }
                }>+1</button>
                <button onClick={() => Players.remove(player._id)} >x</button>
            </p>
        );
    });
};

const handleSubmit = (e) => {
    let playerName = e.target.playerName.value;
    console.log("Player name is " + playerName);
    e.preventDefault();

    if (playerName) {
        e.target.playerName.value = '';

        Players.insert({
            name: playerName,
            score: 0
        });
    }
};

Meteor.startup(() => {
    Tracker.autorun(() => {
        let title = 'Score keep';
let createBy ='yuttana76';

        let name = "Create by YuttanaK.";
        let plyers = Players.find().fetch();

        let jsx = (
            <div>
                <TitleBar title={title} subTitle={createBy} />

                <p>Hello {name} !</p>
                <p>This is by score</p>
                {renderPlayers(plyers)}
                
                <AddPlayer/>
                <form onSubmit={handleSubmit} >
                    <input type="text" name="playerName" placeholder="Player name" />
                    <button>Add Player</button>
                </form>

            </div>
        );
        ReactDOM.render(jsx, document.getElementById('app'));
    });
});