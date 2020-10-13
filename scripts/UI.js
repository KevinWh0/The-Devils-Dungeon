import { setState, state, states } from "../index.js";
import { key, level, levels, player } from "./assetManager.js";
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
  button,
  text,
  stopGameMusic,
} from "./toolbox.js";

export function runUI() {
  if (inArea(mouseX, mouseY, width - 50, 10, 40, 40)) {
    if (mousePressed) {
      stopGameMusic();
      setState(states.menu);
    }
    fill("yellow");
  } else fill("white");
  rectOutline(width - 50, 10, 40, 40, 2);
  rect(width - (50 - 11), 15, 8, 30);
  rect(width - (10 + 19), 15, 8, 30);

  if (player.haskey) renderImage(key, width - 90, 10, 40, 40);
  text(`Level ${level + 1}`, width - 150, (height / 18) * 17);
}
