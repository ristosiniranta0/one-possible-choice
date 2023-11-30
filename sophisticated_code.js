/* sophisticated_code.js */

// This code generates a random maze using the Depth First Search algorithm and then solves it using the A* Search algorithm.

// Create a 2D grid for the maze
const WIDTH = 20;
const HEIGHT = 20;
let maze = new Array(WIDTH);
for (let i = 0; i < WIDTH; i++) {
  maze[i] = new Array(HEIGHT);
}

// Set up directions
const NORTH = [-1, 0];
const EAST = [0, 1];
const SOUTH = [1, 0];
const WEST = [0, -1];
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

// Create a stack for DFS
let stack = [];

// Initialize the maze with walls
for (let i = 0; i < WIDTH; i++) {
  for (let j = 0; j < HEIGHT; j++) {
    maze[i][j] = {
      visited: false,
      walls: {
        north: true,
        east: true,
        south: true,
        west: true
      }
    };
  }
}

// Function to check if a cell is valid
function isValidCell(x, y) {
  return x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT;
}

// Function to get unvisited neighbors
function getUnvisitedNeighbors(x, y) {
  let neighbors = [];
  for (let direction of DIRECTIONS) {
    let nx = x + direction[0];
    let ny = y + direction[1];
    if (isValidCell(nx, ny) && !maze[nx][ny].visited) {
      neighbors.push([nx, ny]);
    }
  }
  return neighbors;
}

// Depth First Search
function generateMaze() {
  let start = [0, 0];
  maze[start[0]][start[1]].visited = true;
  stack.push(start);
  
  while (stack.length > 0) {
    let current = stack.pop();
    let x = current[0];
    let y = current[1];
    
    let neighbors = getUnvisitedNeighbors(x, y);
    
    if (neighbors.length > 0) {
      stack.push(current);
      
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];
      let nx = next[0];
      let ny = next[1];
      
      if (nx === x - 1) {
        maze[x][y].walls.north = false;
        maze[nx][ny].walls.south = false;
      } else if (nx === x + 1) {
        maze[x][y].walls.south = false;
        maze[nx][ny].walls.north = false;
      } else if (ny === y - 1) {
        maze[x][y].walls.west = false;
        maze[nx][ny].walls.east = false;
      } else if (ny === y + 1) {
        maze[x][y].walls.east = false;
        maze[nx][ny].walls.west = false;
      }
      
      maze[nx][ny].visited = true;
      stack.push(next);
    }
  }
}

// Heuristic function for A* Search
function heuristic(x, y) {
  let dx = Math.abs(x - WIDTH);
  let dy = Math.abs(y - HEIGHT);
  return dx + dy;
}

// A* Search
function solveMaze() {
  let openSet = [[0, 0]];
  let cameFrom = {};
  let gScore = {};
  let fScore = {};

  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      gScore[[i, j]] = Infinity;
      fScore[[i, j]] = Infinity;
    }
  }

  gScore[[0, 0]] = 0;
  fScore[[0, 0]] = heuristic(0, 0);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[a] - fScore[b]);
    let current = openSet[0];

    if (current[0] === WIDTH - 1 && current[1] === HEIGHT - 1) {
      return reconstructPath(cameFrom, current);
    }

    openSet.shift();

    let x = current[0];
    let y = current[1];

    for (let direction of DIRECTIONS) {
      let nx = x + direction[0];
      let ny = y + direction[1];

      if (isValidCell(nx, ny) && !maze[x][y].walls[direction[2]]) {
        let tentativeGScore = gScore[current] + 1;

        if (tentativeGScore < gScore[[nx, ny]]) {
          cameFrom[[nx, ny]] = current;
          gScore[[nx, ny]] = tentativeGScore;
          fScore[[nx, ny]] = gScore[[nx, ny]] + heuristic(nx, ny);

          if (!openSet.includes([nx, ny])) {
            openSet.push([nx, ny]);
          }
        }
      }
    }
  }

  return null;
}

// Function to reconstruct the path from start to goal
function reconstructPath(cameFrom, current) {
  let path = [current];

  while (cameFrom.hasOwnProperty(current)) {
    current = cameFrom[current];
    path.unshift(current);
  }

  return path;
}

generateMaze();
let solution = solveMaze();

console.log("Maze:");
console.log(maze);
console.log("Solution:");
console.log(solution);
