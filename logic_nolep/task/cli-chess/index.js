const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

let turn = 'White'; 
let errorMsg = '';

const getPieceColor = (piece) => {
  if (['♙', '♖', '♘', '♗', '♕', '♔'].includes(piece)) return 'White';
  if (['♟', '♜', '♞', '♝', '♛', '♚'].includes(piece)) return 'Black';
  return null;
};

const printBoard = () => {
  console.clear();
  console.log('\n  =============================');
  console.log('     Logic Nolep - Chess CLI   ');
  console.log('  =============================\n');
  console.log('    a   b   c   d   e   f   g   h');
  console.log('  ┌───┬───┬───┬───┬───┬───┬───┬───┐');
  for (let r = 0; r < 8; r++) {
    let rowStr = `${8 - r} │`;
    for (let c = 0; c < 8; c++) {
      rowStr += ` ${board[r][c]} │`;
    }
    console.log(rowStr + ` ${8 - r}`);
    if (r < 7) {
      console.log('  ├───┼───┼───┼───┼───┼───┼───┼───┤');
    }
  }
  console.log('  └───┴───┴───┴───┴───┴───┴───┴───┘');
  console.log('    a   b   c   d   e   f   g   h\n');
  
  if (errorMsg) {
    console.log(`\x1b[31mError: ${errorMsg}\x1b[0m\n`);
    errorMsg = '';
  }
  
  console.log(`Giliran: \x1b[1m${turn === 'White' ? 'Putih (White)' : 'Hitam (Black)'}\x1b[0m`);
};

const isValidMove = (r1, c1, r2, c2, color) => {
  const piece = board[r1][c1];
  const target = board[r2][c2];
  
  if (getPieceColor(target) === color) return false; 

  const dr = r2 - r1;
  const dc = c2 - c1;
  const adr = Math.abs(dr);
  const adc = Math.abs(dc);

  const isPathClear = () => {
    let stepR = dr === 0 ? 0 : dr / adr;
    let stepC = dc === 0 ? 0 : dc / adc;
    let currR = r1 + stepR;
    let currC = c1 + stepC;
    while (currR !== r2 || currC !== c2) {
      if (board[currR][currC] !== ' ') return false;
      currR += stepR;
      currC += stepC;
    }
    return true;
  };

  switch (piece) {
    case '♙': 
      if (dc === 0) { 
        if (dr === -1 && target === ' ') return true;
        if (r1 === 6 && dr === -2 && target === ' ' && board[r1-1][c1] === ' ') return true;
      } else if (adc === 1 && dr === -1) { 
        if (getPieceColor(target) === 'Black') return true;
      }
      return false;
      
    case '♟': 
      if (dc === 0) {
        if (dr === 1 && target === ' ') return true;
        if (r1 === 1 && dr === 2 && target === ' ' && board[r1+1][c1] === ' ') return true;
      } else if (adc === 1 && dr === 1) {
        if (getPieceColor(target) === 'White') return true;
      }
      return false;
      
    case '♖': case '♜': 
      if (dr !== 0 && dc !== 0) return false;
      return isPathClear();
      
    case '♗': case '♝': 
      if (adr !== adc) return false;
      return isPathClear();
      
    case '♕': case '♛':
      if (dr !== 0 && dc !== 0 && adr !== adc) return false;
      return isPathClear();
      
    case '♘': case '♞': 
      return (adr === 2 && adc === 1) || (adr === 1 && adc === 2);
      
    case '♔': case '♚': 
      return adr <= 1 && adc <= 1;
      
    default:
      return false;
  }
};

const play = () => {
    printBoard();
    rl.question(`Masukkan langkah (misal: e2 e4) atau 'exit' untuk keluar: `, (input) => {
        const userInput = input.trim().toLowerCase();
        
        if (userInput === 'exit' || userInput === 'quit') {
            console.log('Terima kasih telah bermain!');
            rl.close();
            return;
        }

        const parts = userInput.split(/\s+/);
        if (parts.length !== 2) {
            errorMsg = 'Format salah! Harus 2 input berupa posisi, misal e2 e4';
            play();
            return;
        }

        const [from, to] = parts;
        if (from.length !== 2 || to.length !== 2) {
            errorMsg = 'Format salah! Posisi harus terdiri dari 1 huruf dan 1 angka, contoh: e2 e4';
            play();
            return;
        }

        const c1 = from.charCodeAt(0) - 97; 
        const r1 = 8 - parseInt(from[1]);
        const c2 = to.charCodeAt(0) - 97;
        const r2 = 8 - parseInt(to[1]);

        if (isNaN(c1) || isNaN(r1) || isNaN(c2) || isNaN(r2) || r1 < 0 || r1 > 7 || c1 < 0 || c1 > 7 || r2 < 0 || r2 > 7 || c2 < 0 || c2 > 7) {
            errorMsg = 'Posisi di luar papan! Gunakan kotak a1 sampai h8.';
            play();
            return;
        }

        const pieceColor = getPieceColor(board[r1][c1]);
        if (pieceColor !== turn) {
            if (pieceColor === null) {
                errorMsg = `Kotak ${from} kosong!`;
            } else {
                errorMsg = `Bukan bidak milikmu! Giliran \x1b[1m${turn}\x1b[0m.`;
            }
            play();
            return;
        }

        const validMove = isValidMove(r1, c1, r2, c2, pieceColor);
        if (!validMove) {
            errorMsg = `Langkah tidak valid untuk bidak ${board[r1][c1]}!`;
            play();
            return;
        }

        
        let captured = board[r2][c2];
        board[r2][c2] = board[r1][c1];
        board[r1][c1] = ' ';

        
        if (board[r2][c2] === '♙' && r2 === 0) board[r2][c2] = '♕';
        if (board[r2][c2] === '♟' && r2 === 7) board[r2][c2] = '♛';

        
        if (captured === '♔') {
            printBoard();
            console.log(`\n\x1b[32mSkakmat! Hitam (Black) menang dengan memakan Raja!\x1b[0m`);
            rl.close();
            return;
        } else if (captured === '♚') {
            printBoard();
            console.log(`\n\x1b[32mSkakmat! Putih (White) menang dengan memakan Raja!\x1b[0m`);
            rl.close();
            return;
        }

        
        turn = turn === 'White' ? 'Black' : 'White';
        play();
    });
};

play();
