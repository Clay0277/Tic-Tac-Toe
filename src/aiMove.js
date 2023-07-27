import findWinner from "./findWinner";

function aiMove(board) {
  let bestScore = -Infinity;
  let bestMove = null;

  // Iterate through all empty cells (possible moves)
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      // Make the move for the AI player
      board[i] = "O";

      // Call the minimax function to get the score for this move
      const score = minimax(board, 0, false);

      // Undo the move
      board[i] = null;

      // Update the bestScore and bestMove if the current move is better
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  const winner = findWinner(board);

  // If the game is over, return the score
  if (winner === "X") return -10 + depth;
  if (winner === "O") return 10 - depth;
  if (board.every((cell) => cell !== null)) return 0;

  if (isMaximizing) {
    // Maximizing player (AI)
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        // Make the move for the AI player
        board[i] = "O";

        // Recursively call minimax with the opponent's turn (minimizing)
        const score = minimax(board, depth + 1, false);

        // Undo the move
        board[i] = null;

        // Update the bestScore with the higher value
        bestScore = Math.max(bestScore, score);
      }
    }

    return bestScore;
  } else {
    // Minimizing player (Opponent)
    let bestScore = Infinity;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        // Make the move for the opponent player
        board[i] = "X";

        // Recursively call minimax with the AI's turn (maximizing)
        const score = minimax(board, depth + 1, true);

        // Undo the move
        board[i] = null;

        // Update the bestScore with the lower value
        bestScore = Math.min(bestScore, score);
      }
    }

    return bestScore;
  }
}

export default aiMove;
