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
} from "https://kevinwh0.github.io/The-Devils-Dungeon/scripts/assetManager.js";
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
} from "https://kevinwh0.github.io/The-Devils-Dungeon/scripts/toolbox.js";
import { placing } from "https://kevinwh0.github.io/The-Devils-Dungeon/index.js";
import { setSpawnPos, spawnX, spawnY } from "https://kevinwh0.github.io/The-Devils-Dungeon/scripts/spawnBlock.js";
export function loadLvl(lvl) {
  loadWorld(levels[lvl]);
}

export function renderLvl() {
  fill("white");
  rect(
    mapoffsetX - 10,
    mapoffsetY - 10,
    worldWidth * blockSize + 20,
    worldHeight * blockSize + 20
  );

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
          fill("red");
          if (placing > -1) map[i][j] = placing;
          else {
            setSpawnPos(
              Math.floor((mouseX - mapoffsetX) / blockSize),
              Math.floor((mouseY - mapoffsetY) / blockSize)
            );
          }
        } else {
          fill("white");
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
