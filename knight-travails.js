function knightMoves(start, end) {
  const boardSize = 8;
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  function isValidMove(x, y) {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
  }

  function getNeighbors(position) {
    const [x, y] = position;
    return moves
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([newX, newY]) => isValidMove(newX, newY));
  }

  function bfs() {
    const queue = [[start]];
    const visited = new Set([start.toString()]);

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current[0] === end[0] && current[1] === end[1]) {
        return path;
      }

      for (const neighbor of getNeighbors(current)) {
        const neighborStr = neighbor.toString();
        if (!visited.has(neighborStr)) {
          visited.add(neighborStr);
          queue.push([...path, neighbor]);
        }
      }
    }
  }

  const shortestPath = bfs();

  console.log(
    `You made it in ${shortestPath.length - 1} moves! Here's your path:`
  );
  shortestPath.forEach((position) =>
    console.log(`[${position[0]},${position[1]}]`)
  );

  return shortestPath;
  
}

// Test cases
console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([0, 0], [7, 7]));
console.log(knightMoves([3, 3], [4, 3]));
