import { setState, state, states } from "../index.js";
import { key, player } from "./assetManager.js";
import {
  fill,
  height,
  mouseX,
  mouseY,
  rectOutline,
  rect,
  width,
  inArea,
  mousePressed,
  renderImage,
} from "./toolbox.js";

export function runUI() {
  if (inArea(mouseX, mouseY, width - 50, 10, 40, 40)) {
    if (mousePressed) {
      setState(states.menu);
    }
    fill("yellow");
  } else fill("white");
  rectOutline(width - 50, 10, 40, 40, 2);
  rect(width - (50 - 11), 15, 8, 30);
  rect(width - (10 + 19), 15, 8, 30);

  if (player.haskey) renderImage(key, width - 90, 10, 40, 40);
}
