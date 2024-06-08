/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Information from './components/Information';
import Squares from './components/Squares';
import RestartButton from './components/RestartButton';
import SwitchMode from './components/SwitchMode';

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

const TicTacToe = () => {
  return (
    <TicTacToeGame className="background">
        <div className="container">
            <Information/>
            <Squares/>
            <div className="actions">
                <RestartButton/>
                <SwitchMode/>
            </div>
        </div>
    </TicTacToeGame>
  );
};

export default TicTacToe;