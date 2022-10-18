document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("what your name?");
  //   console.log(yourName);
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "unknown";
    //name is not empty
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  //remove splash screen
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
// console.log(blocks);

let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
//or
// let orderRange=Array.from(Array(blocks.length).keys())
// console.log(orderRange);

//add order css prperty to game blocks
blocks.forEach((block, index) => {
  //   console.log(block);
  block.style.order = orderRange[index];

  //add click event //after function flipblock
  block.addEventListener("click", function () {
    // trigger the flip block function
    flipBlock(block);
  });
});
// flip block function
function flipBlock(selectedBlock) {
  //add class is flepped
  selectedBlock.classList.add("is-flipped");
  //collect all flipped cards
  let allFlippedBlocks = blocks.filter((flipBlock) =>
    flipBlock.classList.contains("is-flipped")
  );
  //if theres two selected blocks
  if (allFlippedBlocks.length === 2) {
    // console.log("two flipped blocks selected");
    // stop clicking function
    stopClicking();
    // check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//stop clicking function
function stopClicking() {
  //add class no clicking on main contanier
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // remove class no clicking after duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
//check matched block
function checkMatchedBlocks(firstBlocks, secondBlocks) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlocks.dataset.technology === secondBlocks.dataset.technology) {
    firstBlocks.classList.remove("is-flipped");
    secondBlocks.classList.remove("is-flipped");

    firstBlocks.classList.add("has-match");
    secondBlocks.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlocks.classList.remove("is-flipped");
      secondBlocks.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

//shuffle function
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    //get random number
    random = Math.floor(Math.random() * current);
    //decrease length by one
    current--;
    // console.log(random);
    // 1 save current element in stash
    temp = array[current];
    //2 current element=random element
    array[current] = array[random];
    //3 random element =get element from stash
    array[random] = temp;
  }
  return array;
}
