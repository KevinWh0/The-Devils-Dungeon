import {
  removeItem,
  generateUUID,
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
} from "./scripts/assetManager.js";

import { loadLvl, renderLvl } from "./scripts/renderLevel.js";

import { spawnX, spawnY, renderSpawnBlock } from "./scripts/spawnBlock.js";

export let states = {
  game: "game",
  menu: "menu",
};

export let state = states.game;

export let placing = 1;

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
      updateMapOffset();
      renderLvl();
      if (buildMode) {
        for (var i = 0; i < totalBlocks + 4; i++) {
          if (i % 2 == 0) fill("white");
          else fill("lightgrey");

          rect(width - blockSize, i * blockSize, blockSize, blockSize);
          if (i - 3 >= 0)
            blocks
              .get(i - 3)
              .render(width - blockSize, i * blockSize, blockSize, blockSize);
          /*if (i == 4)
          renderImage(
            crate,
            width - blockSize,
            i * blockSize,
            blockSize,
            blockSize
          );*/
        }
        fill("black");
        setFontSize("16", "ariel");
        text("Save", width - blockSize, 1 * blockSize);
        text("Load", width - blockSize, 2 * blockSize);
        text("Spawn", width - blockSize, 3 * blockSize);

        text("Erase", width - blockSize, 4 * blockSize);

        if (mouseX > width - blockSize && mousePressed) {
          for (var i = 0; i < totalBlocks + 4; i++) {
            if (mouseY > i * blockSize && mouseY < (i + 1) * blockSize) {
              if (i == 0) {
                DownloadWorld();
              } else if (i == 1) {
                loadWorld(levels[level]);
                player.x = spawnX;
                player.y = spawnY;
              } else placing = i - 3;
            }
          }
        }
        renderSpawnBlock();
      }
      setFontSize("36", "ariel");

      fill("white");
      text(
        "Press R to restart",
        centerText("Press R to restart", width / 2, 0),
        (height / 18) * 17
      );
      if (keyPressed && keys[82]) {
        loadWorld(levels[level]);
        player.x = spawnX;
        player.y = spawnY;
      }
      player.update();
      player.render();
      //Checks to see if the next level should be loaded
      loadNextLevel();
      break;
    case states.menu:
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