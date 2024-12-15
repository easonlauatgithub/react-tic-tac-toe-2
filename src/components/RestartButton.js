import styled from 'styled-components';

const StyledRestartButton = styled.div`
    background: ${(props) => props.theme.restartButton.normal};
    color: ${(props) => props.theme.color};
    &:hover {
    background: ${(props) => props.theme.restartButton.hover};
  }
  &:active {
    background: ${(props) => props.theme.restartButton.active};
  }
`;

const RestartButton = ({onClick}) => {
    return (
        <StyledRestartButton
        onClick={onClick}
        className="restartButton">
            RestartButton
        </StyledRestartButton>
    );
  };
  
  export default RestartButton;