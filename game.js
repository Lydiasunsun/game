let canvas;
let won = false;
let context;
let request_id;
let color_background = "green";
//set image
let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
let outcome = 0;
let times = [];
let counter = 0;
let player = {
  x: 0,
  y: 0,
  width: 24,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
};

let bird = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: -1 || 1,
  yChange: -1 || 1,
};
let box = {
  x: 245,
  y: 34,
  width: 32,
  height: 32,
  frameX: randint(0, 9),
  frameY: 2,
};
let box2 = {
  x: randint(0, 480),
  y: randint(32, 288),
  width: 32,
  height: 32,
  frameX: randint(0, 9),
  frameY: 2,
};
let box3 = {
  x: randint(0, 480),
  y: randint(32, 288),
  width: 32,
  height: 32,
  frameX: randint(0, 9),
  frameY: 2,
};
let food = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  frameX: 1,
  frameY: 4,
};
let well = {
  x: randint(0, 452),
  y: randint(0, 271),
  width: 16,
  height: 16,
  frameX: 6,
  frameY: 4,
};
let well2 = {
  x: randint(0, 452),
  y: randint(0, 271),
  width: 16,
  height: 16,
  frameX: 6,
  frameY: 4,
};

let humans = [];
let humans2 = [];
let human_eaten = [];

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let playerImage = new Image();
let backgroundImage = new Image();
let humanImage = new Image();
let birdImage = new Image();
let humanImage2 = new Image();
let boxImage = new Image();
let boxImage2 = new Image();
let boxImage3 = new Image();
let foodImage = new Image();
let wellImage = new Image();
let wellImage2 = new Image();
//set sound
let eat_sound = new Audio("apple_bite.ogg");
eat_sound.volume = 1;
let background_sound = new Audio("background.ogg");
background_sound.volume = 0.4;
let win_sound = new Audio("win.ogg");
win_sound.volume = 1;
let lose_sound = new Audio("lose.ogg");
lose_sound.volume = 1;
let openbox_sound = new Audio("openbox.wav");
lose_sound.volume = 0.8;

// set timer
let time = 18;
const countdownEl = document.getElementById("countdown");

// set static background
let blocks = [35, 45];
function checkTile(x, y) {
  let col = Math.floor(x / 16);
  let row = Math.floor(y / 16);

  return background[row][col];
}

//set special places
let specials = [44];
function checkSpecial(x, y) {
  let col = Math.floor(x / 16);
  let row = Math.floor(y / 16);

  return background[row][col];
}

//set background
let tilesPerRow = 10;
let tileSize = 16;

let background = [
  [
    -1, -1, -1, 35, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 18, 19, -1,
  ],
  [
    -1, -1, -1, 45, -1, -1, -1, -1, -1, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 35, -1, -1, 27, 28, 29, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 45, -1, -1, 37, 38, 39, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 35, -1, -1, -1, 35, -1, -1, 47, 48, 49, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 35, 35, 35, -1, 35, -1, -1, -1, 35,
    35, -1, 45, -1, -1, -1, 45, -1, -1, -1, -1, -1, 46,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 45, 45, 45, -1, 45, -1, 35, -1, 45,
    45, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 35, -1, -1, -1, -1, -1, -1, -1, 45, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 45, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    35, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 35, -1, -1, 35, -1, -1, -1,
  ],
  [
    45, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 35, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 45, -1, -1, 45, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1, -1, 45, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 44, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, 44, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 35, 35, 35, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 35, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 45, 45, 45, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 45, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 35, 35, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 44, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 45, 45, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 35, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 45, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1, 35, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 45, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
];

let background2 = [
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 18, 19, -1,
  ],
  [
    -1, -1, -1, 14, 15, 15, 15, 16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 14, 15, 15, 15, 16, -1, -1, 27, 28, 29, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, -1, 26, -1, -1, -1, -1, -1, 25,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 37, 38, 39, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 25, 25, 25, 25, 25, 25, 25, 25,
    -1, -1, 44, -1, -1, -1, -1, -1, -1, 47, 48, 49, -1,
  ],
  [
    -1, -1, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 25, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 25, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 25, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 14, 15, 15, 15, 15, 15, 15, 15, 16, -1, -1, -1, -1, -1, -1,
    -1, 14, 15, 15, 15, 15, 15, 15, 15, 16, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, 46, -1, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 25, 25, 25, 25, -1, -1, 25,
    25, 25, 25, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, -1, -1, 24, -1, -1, -1, -1,
    24, -1, -1, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, 14, 15, 15, 15, 16, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, 25, -1, -1, -1, 14, 15, 15, 15, 16, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
];

let level = 1;
document.addEventListener("DOMContentLoaded", init, false);

function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");

  player.x = canvas.width / 2;
  player.y = canvas.height / 2;

  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  draw();

  setInterval(() => {
    ChangeCountdown();
  }, 1000);

  load_assets(
    [
      { var: playerImage, url: "devil.png" },
      { var: backgroundImage, url: "castle.png" },
      { var: humanImage, url: "human.png" },
      { var: birdImage, url: "bird.png" },
      { var: humanImage2, url: "human.png" },
      { var: boxImage, url: "box.png" },
      { var: boxImage2, url: "box.png" },
      { var: boxImage3, url: "box.png" },
      { var: foodImage, url: "food.png" },
      { var: wellImage, url: "castle.png" },
      { var: wellImage2, url: "castle.png" },
    ],
    draw
  );

  text(
    " If eat at least 4 lecturers before time finish, after time=0 go to castle hit enter for next level."
  );
  background_sound.play();
}

function draw() {
  if (level === 2) {
    //draw background
    background = background2;
    color_background = "black";
    blocks.push(14, 15, 16, 25);

    // drawhuman;
    if (humans2.length <= 5) {
      let human2 = {
        x: 5,
        y: randint(0, canvas.height - 33),
        xChange: randint(-6, 6),
        yChange: randint(-4, 4),
        frameX: 0,
        frameY: 3,
        width: 24,
        height: 32,
      };
      humans2.push(human2);
    }
    for (let human2 of humans2) {
      context.drawImage(
        humanImage2,
        human2.width * human2.frameX,
        human2.height * human2.frameY,
        human2.width,
        human2.height,
        human2.x,
        human2.y,
        human2.width,
        human2.height
      );

      if (human2.xChange < 0) {
        human2.frameY = 3;
      }
      if (human2.xChange > 0) {
        human2.frameY = 1;
      }
      if (human2.yChange < 0 && human2.xChange === 0) {
        human2.frameY = 0;
      }
      if (human2.yChange > 0 && human2.xChange === 0) {
        human2.frameY = 2;
      }
    }

    for (let human2 of humans2) {
      if (collides(human2) && time > 0) {
        human2.y = canvas.height + 10;
        human_eaten.push(human2);
        outcome = outcome + 1;
        eat_sound.play();
      }
    }

    //bird
    context.drawImage(
      birdImage,
      bird.width * bird.frameX,
      bird.height * bird.frameY,
      bird.width,
      bird.height,
      bird.x,
      bird.y,
      bird.width,
      bird.height
    );
    if (bird.xChange < 0) {
      bird.frameY = 0;
    }
    if (bird.xChange > 0) {
      bird.frameY = 3;
    }
    if (bird.yChange < 0 && bird.xChange === 0) {
      bird.frameY = 1;
    }
    if (bird.yChange > 0 && bird.xChange === 0) {
      bird.frameY = 2;
    }

    //show food for 8 seconds
    if (box2.frameY === 3) {
      times.push(time);

      counter = Math.trunc(times.length / 100);

      if (counter <= 8) {
        for (let human2 of humans2) {
          let toFoodx = food.x - human2.x;
          let toFoody = food.y - human2.y;

          let toFoodlength = Math.sqrt(toFoodx * toFoodx + toFoody * toFoody);

          human2.x = human2.x + human2.xChange * 0.2 * (toFoodx / toFoodlength);

          human2.y = human2.y + human2.yChange * 0.2 * (toFoody / toFoodlength);
          text("Humans will come for food! Food only show up 8 seonds");
        }
      }
    }
    if (counter > 8) {
      food.x = -500;
    }
    //win and lose
    if (human_eaten.length === humans2.length) {
      humans2.x = -40;
      win("Congratulations");
      bird.x = -40;
    }

    if (time <= 0 && won === false) {
      lose("Game Over");
      text("Time finish! ");
      bird.x = -40;
      for (let human2 of humans2) {
        human2.x = -40;
      }
    }
    if (time > 0 && collides(bird)) {
      lose("Game Over");
      text("Can't eat bird! ");
      bird.x = -40;
      for (let human2 of humans2) {
        human2.x = -40;
      }
    }
    if (time === 0 && human_eaten.length != humans2.length) {
      lose("Game Over");
      text("Didn't eat enough ");
      bird.x = -40;
      for (let human2 of humans2) {
        human2.x = -40;
      }
    }
  }

  request_id = window.requestAnimationFrame(draw);

  let now = Date.now();
  let elapsed = now - then;
  if (elapsed <= fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);

  //Draw background on canvas

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = color_background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < 20; r += 1) {
    for (let c = 0; c < 32; c += 1) {
      let tile = background[r][c];

      if (tile >= 0) {
        let tileRow = Math.floor(tile / tilesPerRow);
        let tileCol = Math.floor(tile % tilesPerRow);
        context.drawImage(
          backgroundImage,
          tileCol * tileSize,
          tileRow * tileSize,
          tileSize,
          tileSize,
          c * tileSize,
          r * tileSize,
          tileSize,
          tileSize
        );
      }
    }
  }

  //draw well
  draw_well();
  if (won === false && collides(well)) {
    lose("Game Over");
    text("You fell in the well");

    for (let human of humans) {
      human.x = -40;
    }
  }
  if (won === false && collides(well2)) {
    lose("Game Over");
    text("You fell in the well");

    for (let human of humans) {
      human.x = -40;
    }
  }

  if (level === 2) {
    draw_well();
    if (collides(well) && won === false) {
      lose("Game Over");
      text("You fell in the well");
      bird.x = -40;
      for (let human2 of humans2) {
        human2.x = -40;
      }
    }
    if (collides(well2) && won === false) {
      lose("Game Over");
      text("You fell in the well");
      bird.x = -40;
      for (let human2 of humans2) {
        human2.x = -40;
      }
    }

    context.drawImage(
      boxImage,
      box.width * box.frameX,
      box.height * box.frameY,
      box.width,
      box.height,
      box.x,
      box.y,
      box.width,
      box.height
    );
    if (collides(box) && box.frameY === 2) {
      box.frameY = 3;
      time += 10;
      openbox_sound.play();
      text("It's a time box, you have 10 more seconds!");
    }

    context.drawImage(
      boxImage2,
      box2.width * box2.frameX,
      box2.height * box2.frameY,
      box2.width,
      box2.height,
      box2.x,
      box2.y,
      box2.width,
      box2.height
    );
    if (collides(box2) && box2.frameY === 2) {
      box2.frameY = 3;
      openbox_sound.play();
      food.x = box2.x;
      food.y = box2.y - 32;
    }
    if (box2.frameY === 3) {
      context.drawImage(
        foodImage,
        food.width * food.frameX,
        food.height * food.frameY,
        food.width,
        food.height,
        food.x,
        food.y,
        food.width,
        food.height
      );
    }

    context.drawImage(
      boxImage3,
      box3.width * box3.frameX,
      box3.height * box3.frameY,
      box3.width,
      box3.height,
      box3.x,
      box3.y,
      box3.width,
      box3.height
    );
    if (collides(box3) && box3.frameY === 2) {
      box3.frameY = 3;
      openbox_sound.play();

      text("It's empty box.");
    }
  }

  // draw human
  if (level === 1) {
    drawhuman();
  }

  //draw player

  context.drawImage(
    playerImage,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );

  //Draw another object

  if (moveLeft) {
    player.xChange = player.xChange - 0.5;
    player.frameY = 3;

    let tempX = player.x + player.xChange;
    let block = checkTile(tempX, player.y + (player.height * 3) / 4);

    for (let item of blocks) {
      if (item === block) {
        player.xChange = 0;

        return;
      }
    }
    let block2 = checkTile(tempX, player.y + player.height / 4);

    for (let item of blocks) {
      if (item === block2) {
        player.xChange = 0;

        return;
      }
    }
    let block3 = checkTile(tempX, player.y + player.height / 2);

    for (let item of blocks) {
      if (item === block3) {
        player.xChange = 0;

        return;
      }
    }

    let special = checkSpecial(tempX, player.y + (player.height * 3) / 4);

    if (special === 44) {
      player.xChange = player.xChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
  }
  if (moveRight) {
    player.xChange = player.xChange + 0.5;
    player.frameY = 1;

    let tempX = player.x + player.xChange + player.width;
    let block = checkTile(tempX, player.y + (player.height * 3) / 4);

    for (let item of blocks) {
      if (item === block) {
        player.xChange = 0;

        return;
      }
    }
    let block2 = checkTile(tempX, player.y + player.height / 4);

    for (let item of blocks) {
      if (item === block2) {
        player.xChange = 0;

        return;
      }
    }
    let block3 = checkTile(tempX, player.y + player.height / 2);

    for (let item of blocks) {
      if (item === block3) {
        player.xChange = 0;

        return;
      }
    }

    let special = checkSpecial(tempX, player.y + (player.height * 3) / 4);

    if (special === 44) {
      player.xChange = player.xChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
  }
  if (moveUp) {
    player.yChange = player.yChange - 0.5;
    player.frameY = 0;

    let tempY = player.y + player.yChange;

    let block = checkTile(player.x + player.width / 2, tempY);
    for (let item of blocks) {
      if (item === block) {
        player.yChange = 0;

        return;
      }
    }
    let block2 = checkTile(player.x + player.width / 4, tempY);
    for (let item of blocks) {
      if (item === block2) {
        player.yChange = 0;

        return;
      }
    }
    let block3 = checkTile(player.x + (player.width * 3) / 4, tempY);
    for (let item of blocks) {
      if (item === block3) {
        player.yChange = 0;

        return;
      }
    }
    let special = checkSpecial(player.x + (player.width * 3) / 4, tempY);

    if (special === 44) {
      player.yChange = player.yChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
    let special2 = checkSpecial(player.x + (player.width * 2) / 4, tempY);

    if (special2 === 44) {
      player.yChange = player.yChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
    let special3 = checkSpecial(player.x + player.width / 4, tempY);

    if (special3 === 44) {
      player.yChange = player.yChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
  }
  if (moveDown) {
    player.yChange = player.yChange + 0.5;
    player.frameY = 2;

    let tempY = player.y + player.yChange + player.height;

    let block = checkTile(player.x + player.width / 2, tempY);
    for (let item of blocks) {
      if (item === block) {
        player.yChange = 0;

        return;
      }
    }
    let block2 = checkTile(player.x + player.width / 4, tempY);
    for (let item of blocks) {
      if (item === block2) {
        player.yChange = 0;

        return;
      }
    }
    let block3 = checkTile(player.x + (player.width * 3) / 4, tempY);
    for (let item of blocks) {
      if (item === block3) {
        player.yChange = 0;

        return;
      }
    }
    let special = checkSpecial(player.x + (player.width * 3) / 4, tempY);

    if (special === 44) {
      player.yChange = player.yChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
    let special2 = checkSpecial(player.x + (player.width * 2) / 4, tempY);

    if (special2 === 44) {
      player.yChange = player.yChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
    let special3 = checkSpecial(player.x + player.width / 4, tempY);

    if (special3 === 44) {
      player.yChange = player.yChange * 0.5;
      if (won === false) {
        text("Opps! you will slow down stepping on the water ");
      }
    }
  }

  if (player.x < 0) {
    player.xChange = 0;
    player.x = 0;
  }
  if (player.x + player.width > canvas.width) {
    player.xChange = 0;
    player.x = canvas.width - player.width;
  }
  if (player.y < 0) {
    player.yChange = 0;
    player.y = 0;
  }
  if (player.y + player.height > canvas.height) {
    player.yChange = 0;
    player.y = canvas.height - player.height;
  }

  //update the player
  player.x = player.x + player.xChange;
  player.y = player.y + player.yChange;

  //update the other object

  player.xChange = player.xChange * 0.9;
  player.yChange = player.yChange * 0.9;

  if (moveDown || moveUp || moveLeft || moveRight) {
    player.frameX = (player.frameX + 1) % 3;
  }

  if (level != 2 && outcome >= 4 && time === 0) {
    win("Congratulations");
    text("Go to castle and hit enter for next level");
  }

  if (level != 2 && outcome < 4 && time === 0) {
    lose("Game Over");
    time = 0;
  }

  let outcome_element = document.querySelector("#outcome");
  outcome_element.innerHTML = outcome;
}

function activate(event) {
  let key = event.key;
  if (key === "ArrowLeft") {
    moveLeft = true;
  } else if (key === "ArrowUp") {
    moveUp = true;
  } else if (key === "ArrowRight") {
    moveRight = true;
  } else if (key === "ArrowDown") {
    moveDown = true;
  }

  // level
  else if (
    key === "Enter" &&
    outcome >= 4 &&
    player.x < 471 &&
    player.x > 430 &&
    player.y < 32 &&
    time <= 0
  ) {
    levelup();
  }
}

function deactivate(event) {
  let key = event.key;
  if (key === "ArrowLeft") {
    moveLeft = false;
  } else if (key === "ArrowUp") {
    moveUp = false;
  } else if (key === "ArrowRight") {
    moveRight = false;
  } else if (key === "ArrowDown") {
    moveDown = false;
  }
  // level
  else if (
    key === "Enter" &&
    outcome < 4 &&
    player.x < 471 &&
    player.x > 430 &&
    player.y < 32 &&
    time <= 0
  ) {
    levelup();
  }
}

function load_assets(assets, callback) {
  let num_assets = assets.length;
  let loaded = function () {
    num_assets = num_assets - 1;
    if (num_assets === 0) {
      callback();
    }
  };
  for (let asset of assets) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      element.addEventListener("load", loaded, false);
    } else if (element instanceof HTMLAudioElement) {
      crossOriginIsolated.log("audio");
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url;
  }
}

function randint(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function ChangeCountdown() {
  let seconds = Math.floor(time);
  if (seconds >= 0) {
    countdownEl.innerHTML = "00:" + seconds;
    // time--; same with
    time = time - 1;
  }
}

function lose(result) {
  background_sound.pause();
  background_sound.currentTime = 0;
  lose_sound.play();

  let outcome_element = document.querySelector("#result");

  outcome_element.innerHTML = result;
  window.removeEventListener("keydown", activate, false);
  window.removeEventListener("keyup", deactivate, false);
  bird.x = -40;
  for (let human2 of humans2) {
    human2.x = -40;
  }
}

function win(result) {
  let outcome_element = document.querySelector("#result");
  outcome_element.innerHTML = result;
  background_sound.pause();
  background_sound.currentTime = 0;
  win_sound.play();
  text("Go to castle and hit enter for next level");
  won = true;
}

// level
function levelup() {
  level = 2;
  time = 27;
  bird.x = canvas.width / 2;
  bird.y = 100;
  win("");
  win_sound.pause();
  win_sound.currentTime = 0;
  background_sound.play();
  background_sound.currentTime = 50;
  text("Eat all lecturers before the time finish!");
  won = false;
}

function drawhuman() {
  if (humans.length <= 12) {
    let human = {
      x: canvas.width,
      y: randint(0, canvas.height - 32),
      xChange: randint(-4, 0),
      yChange: randint(-2, 2),
      frameX: 0,
      frameY: 3,
      width: 24,
      height: 32,
    };
    humans.push(human);
  }
  for (let human of humans) {
    context.drawImage(
      humanImage,
      human.width * human.frameX,
      human.height * human.frameY,
      human.width,
      human.height,
      human.x,
      human.y,
      human.width,
      human.height
    );
    human.x = human.x + human.xChange;

    human.frameX = (human.frameX + 1) % 3;
  }

  for (let human of humans) {
    if (collides(human) && time > 0) {
      human.y = canvas.height + 10;

      outcome = outcome + 1;
      eat_sound.play();
      return;
    }
  }
}

function bounce() {
  window.requestAnimationFrame(bounce);

  bird.x = bird.x + bird.xChange;
  bird.y = bird.y + bird.yChange;
  bird.frameX = (bird.frameX + 1) % 3;

  if (bird.x < 0) {
    bird.xChange = bird.xChange * -1;
  } else if (bird.x + bird.width >= canvas.width) {
    bird.xChange = bird.xChange * -1;
  }
  if (bird.y < 0) {
    bird.yChange = bird.yChange * -1;
  } else if (bird.y + bird.height >= canvas.height) {
    bird.yChange = bird.yChange * -1;
  }

  for (let human2 of humans2) {
    human2.x = human2.x + human2.xChange / 5;
    human2.y = human2.y + human2.yChange / 5;
    human2.frameX = (human2.frameX + 1) % 3;

    if (human2.x < 0) {
      human2.xChange = human2.xChange * -1;
    } else if (human2.x + human2.width >= canvas.width) {
      human2.xChange = human2.xChange * -1;
    }
    if (human2.y < 0) {
      human2.yChange = human2.yChange * -1;
    } else if (human2.y + human2.height >= canvas.height) {
      human2.yChange = human2.yChange * -1;
    }
  }
}
bounce();

function collides(object) {
  if (
    player.x + (player.width * 3) / 4 < object.x ||
    object.x + (object.width * 3) / 4 < player.x ||
    player.y + (player.height * 3) / 4 < object.y ||
    object.y + (object.height * 3) / 4 < player.y
  ) {
    return false;
  } else {
    return true;
  }
}
function text(clue) {
  let outcome_element = document.querySelector("#clue");
  outcome_element.innerHTML = clue;
}
function draw_well() {
  context.drawImage(
    wellImage,
    well.width * well.frameX,
    well.height * well.frameY,
    well.width,
    well.height,
    well.x,
    well.y,
    well.width,
    well.height
  );
  context.drawImage(
    wellImage2,
    well2.width * well2.frameX,
    well2.height * well2.frameY,
    well2.width,
    well2.height,
    well2.x,
    well2.y,
    well2.width,
    well2.height
  );
}
