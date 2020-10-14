import { setState, state, states } from "../index.js";
import {
  blocks,
  blockSize,
  level,
  levels,
  mainMenuMusic,
  mapoffsetX,
  mapoffsetY,
  menuBackground,
  musicMuted,
  player,
  setLvl,
  setMapOffset,
  setMuted,
  stoneWall,
  totalBlocks,
} from "./assetManager.js";
import { renderLvl } from "./renderLevel.js";
import {
  fill,
  text,
  centerText,
  getTextWidth,
  setFontSize,
  rect,
  renderImage,
  width,
  height,
  inArea,
  mouseX,
  mouseY,
  rectOutline,
  mousePressed,
  stateChangeButton,
  loadWorld,
  button,
  setControls,
  textWraped,
  isPlaying,
} from "./toolbox.js";
let scroller = 0;

export function renderMainMenu() {
  if (!musicMuted && !isPlaying(mainMenuMusic)) {
    mainMenuMusic.play();
  }

  var longest = width > height ? width : height;
  renderImage(menuBackground, 0, 0, longest, longest);
  /*scroller++;
  if (scroller % blockSize == 0) scroller = 0;
  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      blocks
        .get(1)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }*/

  setFontSize(104, "MainFont");
  fill("white");
  text(
    "The Devils Dungeon",
    centerText("The Devils Dungeon", width / 2, 0),
    height / 4
  );
  setFontSize(64, "MainFont");
  stateChangeButton("Play", height / 2, 80, 20, states.game);
  setFontSize(34, "MainFont");

  stateChangeButton("Settings", height / 2 + 100, 50, 0, states.settings);
  stateChangeButton("Credits", height / 2 + 170, 50, 0, states.credits);
  stateChangeButton("How to Play", height / 2 + 150 + 90, 50, 0, states.help);

  /*var textWidth = getTextWidth("Play");
  if (
    inArea(
      mouseX,
      mouseY,
      centerText("Play", width / 2, 0) - textWidth * 0.25,
      height / 2 - 35,
      textWidth * 1.5,
      50
    )
  ) {
    if (mousePressed) {
      setState(states.game);
    }
    fill("yellow");
  } else fill("white");
  rectOutline(
    centerText("Play", width / 2, 0) - textWidth * 0.25,
    height / 2 - 35,
    textWidth * 1.5,
    50,
    3
  );

  text("Play", centerText("Play", width / 2, 0), height / 2);*/
}

let blockHelp = [
  "This is a floor block. You can walk over it",
  "This is a wall block. It stops you, its solid.",
  "These are crates and they can be pushed from any direction",
  "Get on here to win the level (Exit)",
  "This block rotates you when you stand on the block. it wont rotate any blocks you are pushing",
  "This is a exit, but it requires a key to beat this level",
  "This is a key, its used on locked exits",
  "This is a Crate that can only be pushed Up & Down",
  "This is also a Crate, it can only be pushed Left & Right",
];

let pageNumber = 0;
let arrowLeft = new Image();
arrowLeft.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/misc/ArrowLeft.png";
let arrowRight = new Image();
arrowRight.src = "https://kevinwh0.github.io/The-Devils-Dungeon/assets/misc/ArrowRight.png";
let resetTimes = 0;
export function howToPlay() {
  if (pageNumber < 0 || pageNumber > totalBlocks) pageNumber = 0;

  scroller++;
  if (scroller % blockSize == 0) {
    scroller = 0;
    resetTimes++;
  }
  var longest = width > height ? width : height;
  var plrx = /*player.x * blockSize + */ mapoffsetX;
  var plry = /*player.x * blockSize + */ mapoffsetX;

  if (!inArea(plrx, plry, -1000, -1000, width + 1000, height + 1000)) {
    resetTimes = -12.8;
    //player.setplayerPos(0, 0);
  }

  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      /*renderImage(
        stoneWall,
        i * blockSize + scroller,
        j * blockSize + scroller,
        blockSize,
        blockSize
      );*/
      blocks
        .get(0)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }
  setMapOffset(
    scroller + resetTimes * blockSize,
    scroller + resetTimes * blockSize
  );
  renderLvl();
  player.render();
  player.update();

  fill("#ffffff66");

  rect(width / 3, height / 3, width / 3, height / 2);

  rect(10, height / 3, width / 5, height / 2);
  fill("white");
  setFontSize(60, "MainFont");

  text("Help", 60, height / 3 + 60);

  setFontSize(12, "MainFont");

  var howtoplayText =
    "Use WASD to move. Once you start " +
    "moving in a direction you cant " +
    "move again till you hit a solid block. " +
    "If you mess up you can press R to restart." +
    "Each block has its own behavior, and to the" +
    " right of here you will see what each " +
    "block does.";
  //width / 5, 2
  textWraped(howtoplayText, 20, height / 3 + 100, width / 5 - 20, 20);

  //Arrows
  if (inArea(mouseX, mouseY, width / 3 - 10, height / 2, 50, height / 10)) {
    if (mousePressed) pageNumber--;
    if (pageNumber < 0 || pageNumber > totalBlocks) pageNumber = 0;
    fill("yellow");
  } else {
    fill("white");
  }
  rect(width / 3 - 10, height / 2, 50, height / 10);
  renderImage(arrowLeft, width / 3 - 10, height / 2, 50, height / 10);
  if (
    inArea(
      mouseX,
      mouseY,
      width - width / 3 - 50 + 10,
      height / 2,
      50,
      height / 10
    )
  ) {
    if (mousePressed) pageNumber++;
    if (pageNumber < 0 || pageNumber > totalBlocks) pageNumber = 0;

    fill("yellow");
  } else {
    fill("white");
  }
  rect(width - width / 3 - 50 + 10, height / 2, 50, height / 10);
  renderImage(
    arrowRight,
    width - width / 3 - 50 + 10,
    height / 2,
    50,
    height / 10
  );

  blocks
    .get(pageNumber)
    .render(
      width / 3 + width / 3 / 2 - blockSize,
      height / 3 + height / 3 / 2 - blockSize * 2,
      blockSize * 2,
      blockSize * 2
    );

  fill("white");
  //rect(width / 3, height / 3 + height / 3 / 2 + blockSize * 2, width / 3, 50);
  setFontSize(20, "MainFont");
  textWraped(
    blockHelp[pageNumber],
    width / 3 + 10,
    height / 3 + height / 3 / 2 + blockSize * 2,
    width / 3 - 20,
    20
  );

  /*text(
    blockHelp[pageNumber],
    centerText(blockHelp[pageNumber], width / 2, 0),
    height / 3 + height / 3 / 2 + blockSize * 2
  );*/
}

export function settingsMenu() {
  scroller++;
  if (scroller % blockSize == 0) scroller = 0;
  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      /*renderImage(
          stoneWall,
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );*/
      blocks
        .get(1)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }
  button("WASD", 90, 200, 100, 60, 5, () => {
    setControls([87, 65, 83, 68]);
  });
  button("Arrow Keys", 290, 200, 100, 60, 5, () => {
    setControls([38, 37, 40, 39]);
  });
  button("Mute", 90, 280, 100, 60, 5, () => {
    setMuted(true);
  });
  button("Un-Mute", 290, 280, 100, 60, 5, () => {
    setMuted(false);
  });
}

export function creditsScreen() {
  scroller++;
  if (scroller % blockSize == 0) scroller = 0;
  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      blocks
        .get(1)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }

  setFontSize(50, "MainFont");
  fill("white");
  textWraped(
    "KevinWho .... Programmer/Artist/Designer NLNLWeloveindies .... Music",
    40,
    height / 2,
    width - 80,
    50
  );

  setFontSize(20, "MainFont");
  fill("white");
  text(
    "This game was made for the 2020 Devtober Gamejam",
    width -
      getTextWidth("This game was made for the 2020 Devtober Gamejam") -
      20,
    height - 20
  );
  setFontSize(24, "MainFont");
}
