import { woodFloor } from "./assetManager.js";
import { renderImage, rect, fill } from "./toolbox.js";

export class Block {
  img = null;
  col = null;
  solid = false;
  pushable = false;
  updateFunction;
  enableBackground = false;
  //constructor(img) {
  //this.img = img;
  //}
  constructor(col, enableBackground) {
    this.col = col;
    this.enableBackground = enableBackground;
  }
  render(x, y, w, h) {
    if (this.img != null) {
      if (this.enableBackground) renderImage(woodFloor, x, y, w, h);
      renderImage(this.img, x, y, w, h);
    } else {
      fill(this.col);
      rect(x, y, w, h);
    }
  }
  update(x, y, w, h) {
    try {
      this.updateFunction(this, x, y, w, h);
    } catch (err) {}
  }

  setUpdateFunction(func) {
    this.updateFunction = func;
  }

  setSolid(solid) {
    this.solid = solid;
  }
  setPushable(pushable) {
    this.pushable = pushable;
  }
  setImg(img) {
    this.img = img;
  }
}
