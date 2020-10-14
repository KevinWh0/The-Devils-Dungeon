import {
  keys,
  controls,
  keyDown,
  width,
  height,
  fill,
  rect,
  keyReleased,
  keyPushed,
} from "./toolbox.js";
import {
  blocks,
  blockSize,
  loadingLevel,
  map,
  mapoffsetX,
  mapoffsetY,
  worldHeight,
  worldWidth,
} from "./assetManager.js";
import { fps } from "../index.js";
let movekeyPressed = false;
export class Player {
  x = 0;
  y = 0;
  xVel = 0;
  yVel = 0;
  haskey = false;
  totalMovesThisLevel = 0;
  tick = 0;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
    fill("black");
    rect(
      this.x * blockSize + mapoffsetX,
      this.y * blockSize + mapoffsetY,
      blockSize,
      blockSize
    );
  }
  update() {
    if (!loadingLevel) {
      this.tick++;
      if (keyPushed && movekeyPressed) this.totalMovesThisLevel++;

      if (keyDown && this.xVel == 0 && this.yVel == 0) {
        movekeyPressed = true;
        if (keys[controls[0]]) {
          this.yVel -= 1;
        } else if (keys[controls[1]]) {
          this.xVel -= 1;
        } else if (keys[controls[2]]) {
          this.yVel += 1;
        } else if (keys[controls[3]]) {
          this.xVel += 1;
        } else {
          movekeyPressed = false;
        }
      }

      //Make sure it does not leave the 10 by 10 grid
      if (this.x + this.xVel >= worldWidth) {
        this.xVel = 0;
      } else if (this.y + this.yVel >= worldHeight) {
        this.yVel = 0;
      } else if (this.x + this.xVel < 0) {
        this.xVel = 0;
      } else if (this.y + this.yVel < 0) {
        this.yVel = 0;
      }
      var xPushable = blocks.get(map[this.x + this.xVel][this.y + this.yVel])
        .xPushable;
      var yPushable = blocks.get(map[this.x + this.xVel][this.y + this.yVel])
        .yPushable;
      if (xPushable || yPushable) {
        //check if player is in bounds
        if (
          this.x + this.xVel * 2 >= worldWidth ||
          this.y + this.yVel * 2 >= worldHeight ||
          this.x + this.xVel * 2 < 0 ||
          this.y + this.yVel * 2 < 0
        ) {
          this.xVel = 0;
          this.yVel = 0;
          return;
        }
        //Check if spot is vacent
        if (map[this.x + this.xVel * 2][this.y + this.yVel * 2] != 0) {
          this.xVel = 0;
          this.yVel = 0;
          return;
        }
        if (xPushable && this.xVel != 0) {
          var block = map[this.x + this.xVel][this.y + this.yVel];
          map[this.x + this.xVel][this.y + this.yVel] = 0;
          map[this.x + this.xVel * 2][this.y + this.yVel * 2] = block;
        }
        if (yPushable && this.yVel != 0) {
          var block = map[this.x + this.xVel][this.y + this.yVel];
          map[this.x + this.xVel][this.y + this.yVel] = 0;
          map[this.x + this.xVel * 2][this.y + this.yVel * 2] = block;
        }

        //this.xVel = 0;
        //this.yVel = 0;
      }
      if (blocks.get(map[this.x + this.xVel][this.y + this.yVel]).solid) {
        this.xVel = 0;
        this.yVel = 0;
      }
      //if (this.tick % 2 == 0) {
      this.x += this.xVel;
      this.y += this.yVel;
      //}
    }
  }
  setplayerPos(x, y) {
    this.x = x;
    this.y = y;
  }
}
