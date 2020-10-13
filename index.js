import {
  removeItem,
  game,
  text,
  fill,
  setFontSize,
  renderImage,
  width,
  height,
  resetMousePressed,
  DownloadWorld,
  loadWorld,
  mousePressed,
  mouseDown,
  mouseX,
  mouseY,
  inArea,
  rect,
  keyPressed,
  centerText,
  keys,
  keyReleased,
  stateChangeButton,
  isPlaying,
  isMusicListPlaying,
  playRandomSong,
} from "./scripts/toolbox.js";
import {
  level,
  worldWidth,
  worldHeight,
  map,
  blockSize,
  levels,
  crate,
  player,
  blocks,
  totalBlocks,
  loadNextLevel,
  updateMapOffset,
  buildMode,
  unloadMenuImg,
  gameMusic,
  musicMuted,
} from "./scripts/assetManager.js";

import { loadLvl, renderLvl, stoneBackground } from "./scripts/renderLevel.js";

import { spawnX, spawnY, renderSpawnBlock } from "./scripts/spawnBlock.js";

import { runUI } from "./scripts/UI.js";
import {
  creditsScreen,
  howToPlay,
  renderMainMenu,
  settingsMenu,
} from "./scripts/menu.js";

import { buildModeUI } from "./scripts/buildMode.js";

export let states = {
  game: "game",
  menu: "menu",
  settings: "settings",
  help: "help",
  credits: "credits",
};

export let state = states.menu;
export function setState(s) {
  state = s;
}
export let placing = 1;
export function setPlacing(p) {
  placing = p;
}
game.start();
var lastRender = Date.now();
export let fps;

export function updateGameArea() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  fps = Math.round(1 / delta);
  game.clear();
  game.frameNo += 1;
  setFontSize(34, "MainFont");
  fill("grey");
  rect(0, 0, width, height);
  switch (state) {
    case states.game:
      player.update();
      if (game.frameNo % 100 == 0) {
        updateMapOffset();
        if (!musicMuted && !isMusicListPlaying(gameMusic)) {
          playRandomSong(gameMusic);
          //gameMusic[0].play();
        }
      }
      stoneBackground();
      renderLvl();
      player.render();
      buildModeUI();
      setFontSize("36", "ariel");

      fill("white");
      text(
        "Press R to restart the level",
        centerText("Press R to restart the level", width / 2, 0),
        (height / 18) * 17
      );
      if (keyPressed && keys[82]) {
        loadWorld(levels[level]);
        player.x = spawnX;
        player.y = spawnY;
        player.haskey = false;
      }

      runUI();
      //Checks to see if the next level should be loaded
      loadNextLevel();
      //if (!isPlaying(gameMusic)) {
      //gameMusic.play();
      //}
      break;
    case states.menu:
      renderMainMenu();
      updateMapOffset();
      break;

    case states.settings:
      settingsMenu();
      stateChangeButton("Back", 50, 50, 0, states.menu);
      break;
    case states.help:
      setFontSize(36, "MainFont");
      howToPlay();
      stateChangeButton("Back", 50, 50, 0, states.menu);

      break;
    case states.credits:
      creditsScreen();

      stateChangeButton("Back", 50, 50, 0, states.menu);
      break;

    default:
      //error get the user to the menu
      state = states.menu;
      break;
  }
  fill("black");
  text(`FPS: ${fps}`, 10, height - 20);
  resetMousePressed();
}
