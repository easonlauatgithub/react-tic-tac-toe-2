const Information = ({
    playerId
    ,isGameEndedInTie
    ,hasWinner
    ,winnerId
}) => {
    if(hasWinner){
        return (
            <div className="information">Winner is {winnerId}</div>
        );
    }else if(isGameEndedInTie){
        return (
            <div className="information">Game ended in tie</div>
        );
    }else{
        return (
            <div className="information">Waiting for {playerId}</div>
        );
    }    
  };
  
  export default Information;