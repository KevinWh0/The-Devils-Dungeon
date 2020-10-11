import { Block } from "https://kevinwh0.github.io/The-Devils-Dungeon/scripts/block.js";
import { Player } from "https://kevinwh0.github.io/The-Devils-Dungeon/scripts/player.js";
import { height, loadWorld, width } from "https://kevinwh0.github.io/The-Devils-Dungeon/scripts/toolbox.js";
export let buildMode = false;

export let worldWidth = 10;
export let worldHeight = 10;
export let blockSize = 50;

export let mapoffsetX = 0;
export let mapoffsetY = 0;
export function updateMapOffset() {
  mapoffsetX = width / 2 - (worldWidth * blockSize) / 2;
  mapoffsetY = height / 2 - (worldHeight * blockSize) / 2;
}

export let map = new Array(worldWidth);
for (var i = 0; i < worldWidth; i++) {
  map[i] = new Array(worldHeight);
}
for (var i = 0; i < worldWidth; i++) {
  for (var j = 0; j < worldHeight; j++) {
    map[i][j] = 0;
  }
}

export function setMapSize(w, h) {
  worldWidth = w;
  worldHeight = h;

  map = new Array(worldWidth);
  for (var i = 0; i < worldWidth; i++) {
    map[i] = new Array(worldHeight);
  }

  for (var i = 0; i < worldWidth; i++) {
    for (var j = 0; j < worldHeight; j++) {
      map[i][j] = 0;
    }
  }
}

export let level = 0;
//Set to the same thing to give a blank canvas to make levels
export let levelChangeChecker = buildMode ? level : -1;

export let levels = {
  0: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level0.txt",
  1: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level1.txt",
  2: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level2.txt",
  3: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level3.txt",
  4: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level4.txt",
  5: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level5.txt",
  6: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level6.txt",
  7: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level7.txt",
  8: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level8.txt",
  9: "https://kevinwh0.github.io/The-Devils-Dungeon/maps/level9.txt",
};

export function loadNextLevel() {
  if (levelChangeChecker != level) {
    player.xVel = 0;
    player.yVel = 0;
    levelChangeChecker = level;
    loadWorld(levels[level]);
  }
}

export let player = new Player(0, 0);

export let crate = new Image();

crate.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/tiles/crate.png";
export let exitTile = new Image();
exitTile.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/tiles/ExitHole.png";
export let key = new Image();
key.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/tiles/Key.png";
export let rotateBlock = new Image();
rotateBlock.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/tiles/rotateBlock.png";
export let woodFloor = new Image();
woodFloor.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/tiles/woodFloor.png";
export let stoneWall = new Image();
stoneWall.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/tiles/StoneWall.png";
export let lockedExitHole = new Image();
lockedExitHole.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/tiles/LockedExitHole.png";

export let totalBlocks = 6;
export let blocks = new Map();

blocks.set(0, new Block("white"));
blocks.get(0).setImg(woodFloor);
blocks.set(1, new Block("grey"));
blocks.get(1).setSolid(true);
blocks.get(1).setImg(stoneWall);
blocks.set(2, new Block("red"));
blocks.get(2).setImg(crate);
blocks.get(2).setPushable(true);
blocks.get(2).setSolid(true);
blocks.set(3, new Block("purple"));
blocks.get(3).setImg(exitTile);

blocks.get(3).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y
  ) {
    player.x = 0;
    player.y = 0;
    player.xVel = 0;
    player.yVel = 0;
    level++;
    player.haskey = false;
  }
});

blocks.set(4, new Block("blue"));
blocks.get(4).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y
  ) {
    //console.log("Winner!");
    var plrxvel = player.xVel;
    player.xVel = player.yVel;
    player.yVel = plrxvel;
  }
});
blocks.get(4).setImg(rotateBlock);
blocks.set(5, new Block("gold", true));
blocks.get(5).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y &&
    player.haskey
  ) {
    player.x = 0;
    player.y = 0;
    player.xVel = 0;
    player.yVel = 0;
    player.haskey = false;
    level++;
  }
});
blocks.get(5).setImg(lockedExitHole);

blocks.set(6, new Block("yellow", true));
blocks.get(6).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize
  ) {
    player.haskey = true;
    map[(x - mapoffsetX) / blockSize][(y - mapoffsetY) / blockSize] = 0;
  }
});
blocks.get(6).setImg(key);
