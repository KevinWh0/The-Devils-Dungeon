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
} from "./toolbox.js";

export function runUI() {
  if (inArea(mouseX, mouseY, width - 50, 10, 40, 40)) {
    if (mousePressed) {
    }
    fill("yellow");
  } else fill("white");
  rectOutline(width - 50, 10, 40, 40, 2);
  rect(width - (50 - 11), 15, 8, 30);
  rect(width - (10 + 19), 15, 8, 30);
}
