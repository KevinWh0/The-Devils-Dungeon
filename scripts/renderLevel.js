import {
  levels,
  worldWidth,
  worldHeight,
  blockSize,
  map,
  crate,
  blocks,
  mapoffsetX,
  mapoffsetY,
  buildMode,
} from "./assetManager.js";
import {
  loadWorld,
  rect,
  fill,
  renderImage,
  inArea,
  mousePressed,
  mouseDown,
  mouseX,
  mouseY,
} from "./toolbox.js";
import { placing } from "../index.js";
import { setSpawnPos, spawnX, spawnY } from "./spawnBlock.js";
export function loadLvl(lvl) {
  loadWorld(levels[lvl]);
}

export function renderLvl() {
  for (var i = 0; i < worldWidth; i++) {
    for (var j = 0; j < worldHeight; j++) {
      if (buildMode) {
        if (
          mouseDown &&
          inArea(
            mouseX - mapoffsetX,
            mouseY - mapoffsetY,
            i * blockSize,
            j * blockSize,
            blockSize,
            blockSize
          )
        ) {
          if (placing > -1) map[i][j] = placing;
          else {
            setSpawnPos(
              Math.floor((mouseX - mapoffsetX) / blockSize),
              Math.floor((mouseY - mapoffsetY) / blockSize)
            );
          }
        }
      }
      blocks
        .get(map[i][j])
        .update(
          i * blockSize + mapoffsetX,
          j * blockSize + mapoffsetY,
          blockSize,
          blockSize
        );
      blocks
        .get(map[i][j])
        .render(
          i * blockSize + mapoffsetX,
          j * blockSize + mapoffsetY,
          blockSize,
          blockSize
        );
    }
  }
}
