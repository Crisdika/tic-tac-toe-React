import './App.css';
import { useState } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';

// Componentizado
// Sempre começar uma função com Letra maiscula caso for um componente

function calculateWinner(squares) { 
  const lines = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i]; 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function Square({value, onSquareClick}) {
  return (
    <Button 
      className='square'
      variant='conteined'
      onClick={onSquareClick}
      sx={{
        width: '60px',
        height: '60px',
        margin: '4px',
        backgroundColor: '#1976d2'
      }}
    >
      {value}
    </Button>
  );
}

function App() {
  
  const [xIsNext, setxIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let statusGame;

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return; 
    }
  
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else { 
      nextSquares[i] = "O";
    }

    setxIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  if(winner){ 
    statusGame = 'Vencedor: ' + winner
  } else { 
    statusGame = "Próximo jogador: " + (xIsNext ? "X" : "O")
  }

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: '#fff' }}>
          {statusGame}
        </Typography>
        
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
