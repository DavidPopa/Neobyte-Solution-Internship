const generate = document.querySelector(".generate");
generate.addEventListener("click", function () {
  generateIsland(5, 5);
});
function createBoardHTML(matrix) {
  const containerDivs = document.querySelectorAll(".cube > div");
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const spanElement = containerDivs[i].querySelectorAll(".t")[j];
      spanElement.textContent = matrix[i][j];
      if (matrix[i][j] === 0) {
        spanElement.style.backgroundColor = "#4A86E8";
        spanElement.style.filter = "drop-shadow(0 0 15px #4A86E8)";
      }
      if (matrix[i][j] === 1) {
        spanElement.style.backgroundColor = "#FFF2CC";
        spanElement.style.filter = "drop-shadow(0 0 15px #FFF2CC)";
      }
      if (matrix[i][j] === 2) {
        spanElement.style.backgroundColor = "#F6B26B";
        spanElement.style.filter = "drop-shadow(0 0 15px #F6B26B)";
      }
      if (matrix[i][j] === 3) {
        spanElement.style.backgroundColor = "#E69138";
        spanElement.style.filter = "drop-shadow(0 0 15px #E69138)";
      }
      if (matrix[i][j] === 4) {
        spanElement.style.backgroundColor = "#B45F06";
        spanElement.style.filter = "drop-shadow(0 0 15px #B45F06)";
      }
      if (matrix[i][j] === 5) {
        spanElement.style.backgroundColor = "#FFFFFF";
        spanElement.style.filter = "drop-shadow(0 0 15px #FFFFFF)";
      }
    }
  }
}
function getRandomNrBetweenValues(prev, i, next) {
  if (next >= 5) {
    // return Math.floor(Math.random() * (prev - i) + i);
    return prev;
  } else if (prev <= 0) {
    // return Math.floor(Math.random() * (next - i) + i);
    return next;
  }
  return Math.floor(Math.random() * (next - prev + 1) + prev);
}

function createFirstRow(genFirstRandomNr, len) {
  const firstRowOfIsland = [genFirstRandomNr];
  let prev = 0;
  let next = 0;

  for (let i = 1; i < len.length; i++) {
    prev = genFirstRandomNr - 1;
    next = genFirstRandomNr + 1;
    const random = getRandomNrBetweenValues(prev, i, next);

    if (Math.abs(genFirstRandomNr - random) <= 1) {
      firstRowOfIsland.push(random);
      genFirstRandomNr = random;
    } else {
      i--;
    }
  }

  return firstRowOfIsland;
}

function createFirstColumn(genFirstRandomNr, len) {
  const firstColumnOfIsland = [genFirstRandomNr];
  let prev = 0;
  let next = 0;

  for (let i = 1; i < len.length; i++) {
    prev = genFirstRandomNr - 1;
    next = genFirstRandomNr + 1;
    const random = getRandomNrBetweenValues(prev, i, next);

    if (Math.abs(genFirstRandomNr - random) <= 1) {
      firstColumnOfIsland.push(random);
      genFirstRandomNr = random;
    } else {
      i--;
    }
  }

  return firstColumnOfIsland;
}

function generateIsland(n, m) {
  let len = n;
  let fillUp = n;
  const island = Array.from({ length: len }, () => Array(fillUp).fill(0));
  const genFirstRandomNr = Math.floor(Math.random() * (n + 1));

  // Generate first row and first column
  const fRow = createFirstRow(genFirstRandomNr, island[0]);
  const fColumn = createFirstColumn(
    genFirstRandomNr,
    island.map((row) => row[0])
  );

  island[0] = fRow;
  for (let i = 0; i < island.length; i++) {
    island[i][0] = fColumn[i];
  }

  for (let i = 1; i < island.length; i++) {
    for (let j = 1; j < island[i].length; j++) {
      island[i][j] = getRandomNrBetweenValues(
        island[i - 1][j],
        island[i][j],
        island[i][j - 1]
      );
    }
  }
  createBoardHTML(island);
  console.log(island);
}
