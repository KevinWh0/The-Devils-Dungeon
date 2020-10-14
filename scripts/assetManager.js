import { Block } from "./block.js";
import { Player } from "./player.js";
import { height, loadWorld, width } from "./toolbox.js";
export let buildMode = false;

export let musicMuted = false;
export let musicVolume = 1;
export function setMuted(m) {
  musicMuted = m;
}

export let worldWidth = 10;
export let worldHeight = 10;
export let blockSize = 50;

export let mapoffsetX = 0;
export let mapoffsetY = 0;
export function updateMapOffset() {
  mapoffsetX = width / 2 - (worldWidth * blockSize) / 2;
  mapoffsetY = height / 2 - (worldHeight * blockSize) / 2;
}

export function setMapOffset(x, y) {
  mapoffsetX = x;
  mapoffsetY = y;
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
export function setLvl(lvl) {
  level = lvl;
}
export let loadingLevel = false;
export function setLoadingLevel(lvl) {
  loadingLevel = lvl;
}
//Set to the same thing to give a blank canvas to make levels
export let levelChangeChecker = buildMode ? level : -1;
let mapPath = "https://kevinwh0.github.io/The-Devils-Dungeon/maps/";
export let levels = {
  0.5: `${mapPath}easteregg.txt`,
  0: `${mapPath}level0.txt`,
  1: `${mapPath}level1.txt`,
  2: `${mapPath}level2.txt`,
  3: `${mapPath}level3.txt`,
  4: `${mapPath}level4.txt`,
  5: `${mapPath}level5.txt`,
  6: `${mapPath}level6.txt`,
  7: `${mapPath}level7.txt`,
  8: `${mapPath}level8.txt`,
  9: `${mapPath}level9.txt`,
  10: `${mapPath}level10.txt`,
  11: `${mapPath}level11.txt`,
  12: `${mapPath}level12.txt`,
  13: `${mapPath}level13.txt`,
  14: `${mapPath}level14.txt`,
  15: `${mapPath}level15.txt`,
  16: `${mapPath}level16.txt`,
  17: `${mapPath}level17.txt`,
  18: `${mapPath}level18.txt`,
  19: `${mapPath}level19.txt`,
};

export function loadNextLevel() {
  if (levelChangeChecker != level) {
    player.xVel = 0;
    player.yVel = 0;
    levelChangeChecker = level;
    loadWorld(levels[level]);
  }
}
let musicPath = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/sounds/music/";


export let gameMusic = [];

gameMusic.push(new Audio(`${musicPath}/GameMusic/rough-engine.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

gameMusic.push(new Audio(`${musicPath}/GameMusic/power-switch.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

gameMusic.push(new Audio(`${musicPath}/GameMusic/electric-orbit.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

gameMusic.push(new Audio(`${musicPath}/GameMusic/centerpiece-breaker.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

export let mainMenuMusic = new Audio(
  `${musicPath}/MenuMusic/mainMenu-monday-iddim.wav`
);
mainMenuMusic.volume = 0.2;

export let menuBackground = new Image();
menuBackground.src =
  "https://kevinwh0.github.io/The-Devils-Dungeon/assets/misc/MenuBackground.png";

export function loadMenuImg() {
  menuBackground = new Image();
  menuBackground.src =
    "https://kevinwh0.github.io/The-Devils-Dungeon/assets/misc/MenuBackground.png";
}

export function unloadMenuImg() {
  menuBackground = null;
}

export let player = new Player(0, 0);

let assetsStart = "https://kevinwh0.github.io/The-Devils-Dungeon";

export let crate = new Image();
crate.src = `${assetsStart}/assets/tiles/crate.png`;
export let exitTile = new Image();
exitTile.src = `${assetsStart}/assets/tiles/ExitHole.png`;
export let key = new Image();
key.src = `${assetsStart}/assets/tiles/Key.png`;
export let rotateBlock = new Image();
rotateBlock.src = `${assetsStart}/assets/tiles/rotateBlock.png`;
export let woodFloor = new Image();
woodFloor.src = `${assetsStart}/assets/tiles/woodFloor.png`;
export let stoneWall = new Image();
stoneWall.src = `${assetsStart}/assets/tiles/stoneWall.png`;
export let lockedExitHole = new Image();
lockedExitHole.src = `${assetsStart}/assets/tiles/LockedExitHole.png`;
export let horizontalCrate = new Image();
horizontalCrate.src = `${assetsStart}/assets/tiles/horizontalCrate.png`;
export let verticalCrate = new Image();
verticalCrate.src = `${assetsStart}/assets/tiles/verticalCrate.png`;

export let totalBlocks = 8;
export let blocks = new Map();

blocks.set(0, new Block("white"));
blocks.get(0).setImg(woodFloor);
blocks.set(1, new Block("grey"));
blocks.get(1).setSolid(true);
blocks.get(1).setImg(stoneWall);
blocks.set(2, new Block("red"));
blocks.get(2).setImg(crate);
blocks.get(2).setPushable(true, true);
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

blocks.set(4, new Block("blue"), true);
blocks.get(4).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y
  ) {
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
    (y - mapoffsetY) / blockSize == player.y
  ) {
    player.haskey = true;
    map[(x - mapoffsetX) / blockSize][(y - mapoffsetY) / blockSize] = 0;
  }
});
blocks.get(6).setImg(key);

blocks.set(7, new Block("yellow", true));

blocks.get(7).setImg(verticalCrate);
blocks.get(7).setPushable(false, true);
blocks.get(7).setSolid(true);

blocks.set(8, new Block("yellow", true));

blocks.get(8).setImg(horizontalCrate);
blocks.get(8).setPushable(true, false);
blocks.get(8).setSolid(true);
