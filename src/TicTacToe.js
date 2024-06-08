/* eslint-disable no-unused-vars */
import styled from 'styled-components';

const TicTacToeGame = styled.div`
*{
    border: 1px solid black;
    padding:    4px;
}
display: flex;
justify-content: center;
background: ${(props)=>props.theme.background};
`;

const TicTacToe = () => {
  return (
    <TicTacToeGame className="background">
        <div className="container">
            <div className="information">Informations</div>
            <div className="squares">Squares</div>
            <div className="actions">
                <div className="restart">Restart</div>
                <div className="switch">Switch</div>
            </div>
        </div>
    </TicTacToeGame>
  );
};

export default TicTacToe;