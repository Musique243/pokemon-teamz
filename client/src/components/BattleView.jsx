import React, { useState, useEffect, } from 'react';
import axios from 'axios';

const BattleView = () => {
  const [player, setPlayer] = useState({});
  const [playerTeam, setPlayerTeam] = useState([]);
  const [rivalTeam, setRivalTeam] = useState([]);
  const [matchups, setMatchups] = useState({});

  const matchupPopulate = () => {
    setMatchups({
      fire: ['grass', 'bug', 'steel', 'ice',],
      water: ['fire', 'rock', 'ground'],
      grass: ['water', 'rock', 'ground'],
      electric: ['water', 'flying'],
      psychic: ['fighting', 'poison'],
      normal: [],
      fighting: ['normal', 'steel', 'ice', 'rock'],
      flying: ['grass', 'bug', 'fighting'],
      rock: ['flying', 'ice', 'fire'],
      ice: ['flying', 'ground', 'grass', 'dragon'],
      steel: ['fairy', 'ice', 'rock'],
      ground: ['electric', 'fire', 'steel', 'poison', 'rock'],
      poison: ['grass', 'bug', 'fairy'],
      bug: ['psychic', 'grass', 'dark'],
      dark: ['psychic', 'ghost'],
      ghost: ['psychic', 'ghost'],
      fairy: ['fighting', 'dark', 'dragon'],
      dragon: ['dragon'],
    });
  };

  const teamGen = () => {
    console.log('Hardcoded an additional 5 mons onto player team. Resulting Team:');
    const generatedTeam = [
      player.favPokemonName,
      'meowth',
      'onix',
      'gyarados',
      'rhydon',
      'nidoqueen'
    ];
    console.log(generatedTeam);
    setPlayerTeam(generatedTeam);
  };

  const rivalGen = () => {
    if (playerTeam.length) {
      console.log('Hardcoded a team of banana dinosaurs to fight the player: ');
      const generatedTeam = [
        'tropius',
        'tropius',
        'tropius',
        'tropius',
        'tropius',
        'tropius'
      ];
      console.log(generatedTeam);
      setRivalTeam(generatedTeam);
    } else {
      console.log('You haven\'t gotten a team for battling yet!');
    }


  };

  const getFavorite = () => {
    axios.get('api/user/current')
      .then((result) => {
        console.log(result);
        const { _id, username, wins, losses, draws, favPokemonImage, favPokemonName, favPokemonType1, favPokemonType2 } = result.data; //deconstruction
        setPlayer({ _id, username, wins, losses, draws, favPokemonImage, favPokemonName, favPokemonType1, favPokemonType2 }); //object shorthand
      });
  };

  const handleResult = (battleResult) => {
    const battleRecord = {};
    switch (battleResult) {
    case 'win':
      battleRecord.wins = player.wins + 1;
      break;
    case 'loss':
      battleRecord.losses = player.losses + 1;
      break;
    case 'draw':
      battleRecord.draws = player.draws + 1;
      break;
    }
    console.log('RESULT LOGGED: ', battleResult, battleRecord );
    //axios request to server to update user record in DB
    axios.patch('api/user/updateRecords', battleRecord)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => { console.error(err); });
  };

  const battleResolution = () => {
    console.log('insert battle mechanics here');
  };

  const testOpponent = [
    'magikarp',
    'magikarp',
    'magikarp',
    'magikarp',
    'magikarp',
    'magikarp'
  ];

  useEffect(() => {
    getFavorite();
    matchupPopulate();
  }, []);

  return (
    <>
      <div> Battle Screen </div>
      <div> Get a team that includes your favorite Pokemon!</div>
      <div>Your favorite pokemon: {player.favPokemonName}</div>
      <img src={player.favPokemonImage} />
      <span>Type: </span>
      <span>{player.favPokemonType1}</span>
      {player.favPokemonType2 ? <span>/ {player.favPokemonType2}</span> : <></>}
      <p></p>
      <button onClick={teamGen}> Generate Team</button>
      <div> Your Team: INSERT GRAPHIC HERE</div>
      <div>YOU BATTLED WELL! Report the result below!</div>
      <button onClick={rivalGen}> Fight a rival!</button>
      <button onClick={() => { handleResult('win'); }}> Log a win</button>
      <button onClick={() => { handleResult('loss'); }}> Log a loss</button>
    </>
  );
};

export default BattleView;
