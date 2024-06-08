import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import TicTacToe from './TicTacToe';
import themes from './themes';

const defaultTheme = Object.keys(themes)[0];

function App() {
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <TicTacToe/>
    </ThemeProvider>
  );
}

export default App;
