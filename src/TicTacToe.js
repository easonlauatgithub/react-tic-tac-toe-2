/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Information from './components/Information';
import Squares from './components/Squares';
import RestartButton from './components/RestartButton';
import SwitchMode from './components/SwitchMode';

import { useState } from "react";

const TicTacToeGame = styled.div`
*{
    border: 1px solid black;
    padding:    4px;
}

/* 將置中容器放置於背景的正中間 */
display: flex;
justify-content: center;
background: ${(props)=>props.theme.rainbow};
padding: 20px;
min-height: 100vh;
box-sizing: border-box;

.container {
  /* 讓置中容器中的元件垂直排列 */
  display: flex;
  flex-direction: column;
  & > *:not(:first-of-type) {
    margin-top: 20px; // 給元件之間一點間距
    border: 1px solid orange;
  }
}
.actions {
  & > *:not(:first-of-type) {
    margin-top: 20px; // 給元件之間一點間距
    border: 1px solid yellow;
  }
}
`;

const PLAYERS_ID = [1,-1]
const defaultPlayersStepsMap = {
  [1]:[],
  [-1]:[]
}
const WINNER_STEPS_LIST = [
  //up to down
  [0,1,2],
  [3,4,5],
  [6,7,8],
  //left to right
  [0,3,6],
  [1,4,7],
  [2,5,8],
  //cross
  [0,4,8],
  [2,4,6],
]
const getJudgementInfo = (playersStepsMap)=>{
  let winnerId = 0;
  let winnerStepsList = [];
  let lastStepsToWin = {...defaultPlayersStepsMap};
  // loop all players
  const playerIds = Object.keys(playersStepsMap);
  playerIds.forEach((playerId)=>{
    const playerSteps = playersStepsMap[playerId]
    // find remaining steps list    
    const remainingStepsList = WINNER_STEPS_LIST.map((steps)=>{
      const newSteps = steps.filter((step)=>{
        return (playerSteps.indexOf(step) === -1)
      });
      return newSteps
    });
    // find remaining steps list length = 0 or 1
    remainingStepsList.map((remainingSteps, index)=>{
      if (remainingSteps.length === 0){
        winnerId = playerId;
        winnerStepsList = [
          ...winnerStepsList,
          WINNER_STEPS_LIST[index]
        ]        
      }
      if (remainingSteps.length === 1){
        lastStepsToWin[playerId] = [
          ...lastStepsToWin[playerId],
          remainingSteps
        ]
      }
    });
  });
  return {
    winnerId,
    winnerStepsList,
    lastStepsToWin
  };
}

const TicTacToe = () => {
  const [playerId, setPlayerId] = useState(PLAYERS_ID[0]);
  const [playersStepsMap, setPlayersStepsMap] = useState(defaultPlayersStepsMap);
  const [judgementInfo, setJudgementInfo] = useState({
    winnerId: 0,
    winnerStepsList: [],
    lastStepsToWin: {}   
  });
  const {
    winnerId,
    winnerStepsList,
    lastStepsToWin
  } = judgementInfo;
  const hasWinner = winnerId !== 0;
  const isGameEndedInTie = PLAYERS_ID.flatMap((playerId) => playersStepsMap[playerId]).length === 9 && !hasWinner;
  const winnerSteps = winnerStepsList.flatMap((steps) => steps);
  
  const isSquareNotClicked = (squareId)=>{
    const allDisabledBlockIds = PLAYERS_ID.flatMap((playerId)=>{
      return playersStepsMap[playerId];
    })
    return allDisabledBlockIds.indexOf(squareId) === -1
  }
  const handleClickSquare = (squareId)=>{
    // check if square not clicked
    const isSquareEnable = isSquareNotClicked(squareId);
    if(isSquareEnable && !hasWinner){
    // record the clicked, by playerId 1 or -1
    const newPlayersStepsMap = {
      ...playersStepsMap,
      [playerId]:[
        ...playersStepsMap[playerId],
        squareId
      ]
    }
    setPlayersStepsMap(newPlayersStepsMap);
    // set playId * -1
    setPlayerId(prev => -1 * prev);
    // check if any winner, last step to win
    setJudgementInfo(getJudgementInfo(newPlayersStepsMap));
    }
  }
  const handleResetAllState = ()=>{
    console.log("handleResetAllState");
    setPlayerId(PLAYERS_ID[0]);
    setPlayersStepsMap(defaultPlayersStepsMap);
    setJudgementInfo({
      winnerId: 0,
      winnerStepsList: [],
      lastStepsToWin: {}   
    });
  }
  const isWinnerStep = (winnerId != 0);
  return (
    <TicTacToeGame className="background">
        <div className="container">
            <Information
            playerId={playerId}
            isGameEndedInTie={isGameEndedInTie}
            hasWinner={hasWinner}
            winnerId={winnerId}
            />
            <Squares
            handleClickSquare = {handleClickSquare}
            playersStepsMap={playersStepsMap}
            winnerSteps={winnerSteps}
            />
            <div className="actions">
                <RestartButton
                onClick = {handleResetAllState}
                />
                <SwitchMode/>
            </div>
        </div>
    </TicTacToeGame>
  );
};

export default TicTacToe;