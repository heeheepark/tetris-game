// DOM

const playground = document.querySelector(".playground > ul");

// Setting
const game_rows = 20;
const game_cols = 10;

// varivables
let score = 0;
let duration = 500; //블록이 떨어지는 시간
let downInterval;
let tempMovingItem;

const BLOCKS = {
  tree: [
    [[2, 1],[0, 1],[1, 0],[1, 1]],
    [],
    [],
    [],
  ]
}

const movingItem = {
  type: "tree",
  direction: 0, // 화살표 방향을 눌렀을 때 방향을 돌리는 걸 적용
  top: 0,
  left: 3,
};

init()

// functions
function init() { //처음 시작될 때 실행될 함수
  tempMovingItem = { ...movingItem};
  for(let i = 0; i < game_rows; i++) {
    prependNewLine()
  }
  renderBlocks()
}


function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for(let j = 0; j < game_cols; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul)
  playground.prepend(li)
}

function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach(moving => {
    moving.classList.remove(type, "moving");
  })
  BLOCKS[type][direction].forEach(block => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y] ? playground.childNodes[0].childNodes[x] : null;
    const isAvailable = checkEmpty(target);
    if(isAvailable) {
      target.classList.add(type, "moving")
    } else {
      tempMovingItem = { ...movingItem }
      // setTimeout(()=>{
      //  renderBlocks();
      // }, 0)
      renderBlocks()
    }
  })
  movingItem.left = left;
  movingItem.top = top;
  movingItim.direction = direction;

}
function checkEmpty(target) {
  if(!target) {
    return false;
  }
  return true;
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks()
}

// event handlig
document.addEventListener("keydown", e => {
  switch(e.keyCode){
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
      break;
    case 40:
      moveBlock("top", 1);
      break;
    default:
      break;
  }
  console.log(e)
})