/*
    Title: Scrabble Game
    Created by John Wesley Agojo

    Date Due: 12/17/2025

    File: script.js

    Assignment: The main purpose of this assignment is to create a 
    functional Scrabble game using HTML, CSS, and JavaScript.
*/

document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("scrabble-board");
  const rackElement = document.getElementById("tile-rack");
  const scoreText = document.getElementById("score");
  const letterDisplay = document.getElementById("letter-counter");
  const garbageBin = document.getElementById("garbage-bin");
  const notificationModal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalCloseButton = document.getElementById("modal-close");
  const wordValidateButton = document.getElementById("validate-word");
  const tilesRefreshButton = document.getElementById("refresh-tiles");
  const tileRecallButton = document.getElementById("recall-tile");
  const gameRestartButton = document.getElementById("new-game");
  let currentScore = 0;
  let centerOccupied = false;
  let nextTileId = 0;
  let completedWords = [];
  let wordCount = 0;
  let allPlacedTiles = [];
  let currentTurnTiles = [];
  let hasRefreshed = false;

  const GRID_SIZE = 15;
  const MAX_RACK_TILES = 7;
  const PREMIUM_SQUARES = [
    { row: 7, col: 7, type: "center", label: "⭐ Double Word Score" },
    { row: 0, col: 0, type: "triple-word", label: "Triple Word Score" },
    { row: 0, col: 14, type: "triple-word", label: "Triple Word Score" },
    { row: 14, col: 0, type: "triple-word", label: "Triple Word Score" },
    { row: 14, col: 14, type: "triple-word", label: "Triple Word Score" },
    { row: 0, col: 7, type: "triple-word", label: "Triple Word Score" },
    { row: 14, col: 7, type: "triple-word", label: "Triple Word Score" },
    { row: 7, col: 0, type: "triple-word", label: "Triple Word Score" },
    { row: 7, col: 14, type: "triple-word", label: "Triple Word Score" },
    { row: 1, col: 1, type: "double-word", label: "Double Word Score" },
    { row: 2, col: 2, type: "double-word", label: "Double Word Score" },
    { row: 3, col: 3, type: "double-word", label: "Double Word Score" },
    { row: 4, col: 4, type: "double-word", label: "Double Word Score" },
    { row: 10, col: 10, type: "double-word", label: "Double Word Score" },
    { row: 11, col: 11, type: "double-word", label: "Double Word Score" },
    { row: 12, col: 12, type: "double-word", label: "Double Word Score" },
    { row: 13, col: 13, type: "double-word", label: "Double Word Score" },
    { row: 13, col: 1, type: "double-word", label: "Double Word Score" },
    { row: 1, col: 13, type: "double-word", label: "Double Word Score" },
    { row: 12, col: 2, type: "double-word", label: "Double Word Score" },
    { row: 2, col: 12, type: "double-word", label: "Double Word Score" },
    { row: 11, col: 3, type: "double-word", label: "Double Word Score" },
    { row: 3, col: 11, type: "double-word", label: "Double Word Score" },
    { row: 10, col: 4, type: "double-word", label: "Double Word Score" },
    { row: 4, col: 10, type: "double-word", label: "Double Word Score" },
    { row: 1, col: 5, type: "triple-letter", label: "Triple Letter Score" },
    { row: 1, col: 9, type: "triple-letter", label: "Triple Letter Score" },
    { row: 5, col: 1, type: "triple-letter", label: "Triple Letter Score" },
    { row: 5, col: 13, type: "triple-letter", label: "Triple Letter Score" },
    { row: 9, col: 1, type: "triple-letter", label: "Triple Letter Score" },
    { row: 9, col: 13, type: "triple-letter", label: "Triple Letter Score" },
    { row: 13, col: 5, type: "triple-letter", label: "Triple Letter Score" },
    { row: 13, col: 9, type: "triple-letter", label: "Triple Letter Score" },
    { row: 5, col: 5, type: "triple-letter", label: "Triple Letter Score" },
    { row: 5, col: 9, type: "triple-letter", label: "Triple Letter Score" },
    { row: 9, col: 5, type: "triple-letter", label: "Triple Letter Score" },
    { row: 9, col: 9, type: "triple-letter", label: "Triple Letter Score" },
    { row: 0, col: 3, type: "double-letter", label: "Double Letter Score" },
    { row: 0, col: 11, type: "double-letter", label: "Double Letter Score" },
    { row: 2, col: 6, type: "double-letter", label: "Double Letter Score" },
    { row: 2, col: 8, type: "double-letter", label: "Double Letter Score" },
    { row: 3, col: 0, type: "double-letter", label: "Double Letter Score" },
    { row: 3, col: 7, type: "double-letter", label: "Double Letter Score" },
    { row: 3, col: 14, type: "double-letter", label: "Double Letter Score" },
    { row: 6, col: 2, type: "double-letter", label: "Double Letter Score" },
    { row: 6, col: 6, type: "double-letter", label: "Double Letter Score" },
    { row: 6, col: 8, type: "double-letter", label: "Double Letter Score" },
    { row: 6, col: 12, type: "double-letter", label: "Double Letter Score" },
    { row: 7, col: 3, type: "double-letter", label: "Double Letter Score" },
    { row: 7, col: 11, type: "double-letter", label: "Double Letter Score" },
    { row: 8, col: 2, type: "double-letter", label: "Double Letter Score" },
    { row: 8, col: 6, type: "double-letter", label: "Double Letter Score" },
    { row: 8, col: 8, type: "double-letter", label: "Double Letter Score" },
    { row: 8, col: 12, type: "double-letter", label: "Double Letter Score" },
    { row: 11, col: 0, type: "double-letter", label: "Double Letter Score" },
    { row: 11, col: 7, type: "double-letter", label: "Double Letter Score" },
    { row: 11, col: 14, type: "double-letter", label: "Double Letter Score" },
    { row: 14, col: 3, type: "double-letter", label: "Double Letter Score" },
    { row: 14, col: 11, type: "double-letter", label: "Double Letter Score" },
    { row: 12, col: 6, type: "double-letter", label: "Double Letter Score" },
    { row: 12, col: 8, type: "double-letter", label: "Double Letter Score" }
  ];

  const tileManager = {
    restore() {
      for (const letter in ScrabbleTiles) {
        if (ScrabbleTiles.hasOwnProperty(letter)) {
          ScrabbleTiles[letter]["number-remaining"] = ScrabbleTiles[letter]["original-distribution"];
        }
      }
    },

    selectRandom() {
      const availableLetters = Object.keys(ScrabbleTiles);
      const totalRemaining = availableLetters.reduce((sum, letter) => 
        sum + ScrabbleTiles[letter]["number-remaining"], 0);

      if (totalRemaining === 0) return null;

      let random = Math.floor(Math.random() * totalRemaining);
      for (const letter of availableLetters) {
        random -= ScrabbleTiles[letter]["number-remaining"];
        if (random < 0) {
          ScrabbleTiles[letter]["number-remaining"]--;
          return letter;
        }
      }
      return null;
    },

    create(letter) {
      const tile = document.createElement("img");
      tile.src = letter === "_" 
        ? "./graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg"
        : `./graphics_data/Scrabble_Tiles/Scrabble_Tile_${letter}.jpg`;
      tile.classList.add("tile");
      tile.setAttribute("data-letter", letter);
      tile.setAttribute("data-tile-id", `tile-${nextTileId++}`);
      
      $(tile).draggable({
        revert: "invalid",
        helper: "clone",
        cursor: "move",
        start: function() {
          $(this).css("opacity", "0.5");
        },
        stop: function() {
          $(this).css("opacity", "1");
        }
      });
      
      return tile;
    },

    draw(count) {
      for (let i = 0; i < count; i++) {
        const letter = this.selectRandom();
        if (!letter) {
          showModal(`Game Over! No more tiles available!\nWords Scored: ${wordCount}\nTotal Score: ${currentScore}`);
          return;
        }
        rackElement.appendChild(this.create(letter));
      }
    },

    replenishRack() {
      const currentCount = rackElement.querySelectorAll('.tile').length;
      const needed = MAX_RACK_TILES - currentCount;
      if (needed > 0) this.draw(needed);
    }
  };

  const boardManager = {
    build() {
      boardElement.innerHTML = "";
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          const cell = this.createCell(row, col);
          boardElement.appendChild(cell);
        }
      }
    },

    createCell(row, col) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      cell.setAttribute("data-locked", "false");
      const bonus = PREMIUM_SQUARES.find(b => b.row === row && b.col === col);
      if (bonus) {
        cell.classList.add(bonus.type);
        const label = document.createElement("span");
        label.textContent = bonus.label;
        label.classList.add("cell-label");
        cell.appendChild(label);
      }

      $(cell).droppable({
        accept: ".tile",
        drop: function(event, ui) {
          handleDrop(event, ui, $(this));
        },
        over: function() {
          $(this).addClass("drop-hover");
        },
        out: function() {
          $(this).removeClass("drop-hover");
        }
      });

      return cell;
    },

    getCell(row, col) {
      return boardElement.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    },

    isAdjacent(row, col) {
      if (allPlacedTiles.length === 0) return true;

      const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of offsets) {
        const adjRow = row + dr;
        const adjCol = col + dc;
        if (adjRow >= 0 && adjRow < GRID_SIZE && adjCol >= 0 && adjCol < GRID_SIZE) {
          const adjCell = this.getCell(adjRow, adjCol);
          if (adjCell && adjCell.getAttribute("data-locked") === "true") {
            return true;
          }
        }
      }
      return false;
    },

    isAligned(row, col) {
      if (currentTurnTiles.length === 0) return true;

      const first = currentTurnTiles[0];
      const sameRow = currentTurnTiles.every(t => t.row === first.row);
      const sameCol = currentTurnTiles.every(t => t.col === first.col);

      if (sameRow) return row === first.row;
      if (sameCol) return col === first.col;
      return true;
    },

    extractWords() {
      const grid = [];
      for (let row = 0; row < GRID_SIZE; row++) {
        grid[row] = [];
        for (let col = 0; col < GRID_SIZE; col++) {
          const cell = this.getCell(row, col);
          const tile = cell.querySelector('img.tile');
          grid[row][col] = tile ? tile.getAttribute('data-letter') : null;
        }
      }

      const words = [];

      for (let row = 0; row < GRID_SIZE; row++) {
        let word = [];
        for (let col = 0; col < GRID_SIZE; col++) {
          if (grid[row][col]) {
            word.push(grid[row][col]);
          } else {
            if (word.length > 1) words.push(word.join(''));
            word = [];
          }
        }
        if (word.length > 1) words.push(word.join(''));
      }

      for (let col = 0; col < GRID_SIZE; col++) {
        let word = [];
        for (let row = 0; row < GRID_SIZE; row++) {
          if (grid[row][col]) {
            word.push(grid[row][col]);
          } else {
            if (word.length > 1) words.push(word.join(''));
            word = [];
          }
        }
        if (word.length > 1) words.push(word.join(''));
      }

      return words;
    },

    findWordPosition(word) {
      for (let row = 0; row < GRID_SIZE; row++) {
        let built = [];
        let positions = [];
        for (let col = 0; col < GRID_SIZE; col++) {
          const cell = this.getCell(row, col);
          const tile = cell ? cell.querySelector('img.tile') : null;
          if (tile) {
            built.push(tile.getAttribute('data-letter'));
            positions.push({ row, col });
          } else {
            if (built.join('') === word) return positions;
            built = [];
            positions = [];
          }
        }
        if (built.join('') === word) return positions;
      }

      for (let col = 0; col < GRID_SIZE; col++) {
        let built = [];
        let positions = [];
        for (let row = 0; row < GRID_SIZE; row++) {
          const cell = this.getCell(row, col);
          const tile = cell ? cell.querySelector('img.tile') : null;
          if (tile) {
            built.push(tile.getAttribute('data-letter'));
            positions.push({ row, col });
          } else {
            if (built.join('') === word) return positions;
            built = [];
            positions = [];
          }
        }
        if (built.join('') === word) return positions;
      }

      return [];
    }
  };

  function handleDrop(event, ui, $targetCell) {
    const targetCell = $targetCell[0];
    const tile = ui.draggable[0];

    const row = parseInt(targetCell.getAttribute("data-row"));
    const col = parseInt(targetCell.getAttribute("data-col"));

    const isCenterSquare = (row === 7 && col === 7);
    if (allPlacedTiles.length === 0 && !isCenterSquare) {
      showModal("The first tile must be placed on the center square.");
      return;
    }

    if (allPlacedTiles.length > 0 && !boardManager.isAdjacent(row, col)) {
      showModal("This tile must be placed adjacent to an existing tile.");
      return;
    }

    if (!boardManager.isAligned(row, col)) {
      showModal("All tiles in a turn must be placed in the same row or column.");
      return;
    }

    if (targetCell.getAttribute("data-locked") === "false") {
      let savedLabel = null;
      const label = targetCell.querySelector(".cell-label");
      if (label) {
        savedLabel = label.textContent;
        label.remove();
      }

      ui.draggable.detach();
      
      targetCell.appendChild(tile);
      targetCell.setAttribute("data-locked", "true");
      tile.style.width = "100%";
      tile.style.height = "100%";
      tile.style.position = "relative";
      tile.style.top = "0";
      tile.style.left = "0";

      $(tile).draggable("disable");

      if (isCenterSquare) centerOccupied = true;

      allPlacedTiles.push({ tile, cell: targetCell, validated: false, premiumLabel: savedLabel });
      currentTurnTiles.push({ tile, cell: targetCell, row, col });

      updateLetterCounter();
    }
  }

  function handleRefresh() {
    const tiles = rackElement.querySelectorAll('.tile');
    tiles.forEach(tile => {
      const letter = tile.getAttribute('data-letter');
      if (ScrabbleTiles[letter]) {
        ScrabbleTiles[letter]["number-remaining"]++;
      }
      tile.remove();
    });
    tileManager.replenishRack();
    updateLetterCounter();
    hasRefreshed = true;
  }

  function handleRecall() {
    if (hasRefreshed) {
      showModal("Cannot recall tile after refreshing tiles.");
      return;
    }

    if (currentTurnTiles.length === 0) {
      showModal("No recently placed tile to recall.");
      return;
    }

    const recent = currentTurnTiles.pop();
    const stackIndex = allPlacedTiles.findIndex(t => t.tile === recent.tile);
    
    if (stackIndex !== -1) {
      const entry = allPlacedTiles[stackIndex];
      allPlacedTiles.splice(stackIndex, 1);

      if (entry.premiumLabel) {
        const label = document.createElement("span");
        label.textContent = entry.premiumLabel;
        label.classList.add("cell-label");
        recent.cell.appendChild(label);
      }

      recent.cell.removeChild(recent.tile);
      recent.cell.setAttribute("data-locked", "false");

      rackElement.appendChild(recent.tile);
      recent.tile.style.width = "";
      recent.tile.style.height = "";
      recent.tile.style.position = "";
      recent.tile.style.top = "";
      recent.tile.style.left = "";
      
      $(recent.tile).draggable("enable");

      updateLetterCounter();
    }
  }

  async function handleValidate() {
    if (currentTurnTiles.length === 0) {
      showModal("No new tiles placed this turn.");
      return;
    }

    const allWords = boardManager.extractWords();
    if (allWords.length === 0) {
      showModal("No words found on the board.");
      return;
    }

    const newWords = allWords.filter(w => !completedWords.includes(w));
    if (newWords.length === 0) {
      showModal("No new words formed. Try placing tiles to create new words.");
      return;
    }

    const newTileIds = currentTurnTiles.map(t => t.tile.getAttribute('data-tile-id'));
    let turnScore = 0;

    for (const word of newWords) {
      const isValid = await checkWordValidity(word);
      if (!isValid) {
        showModal(`The word "${word}" is not a valid English word.`);
        return;
      }
      let wordScore = 0;
      let wordMultiplier = 1;
      let bonuses = [];
      let tilesInWord = [];

      const positions = boardManager.findWordPosition(word);
      
      for (const pos of positions) {
        const cell = boardManager.getCell(pos.row, pos.col);
        if (!cell) continue;
        const tile = cell.querySelector('img.tile');
        if (!tile) continue;

        const letter = tile.getAttribute('data-letter');
        const tileId = tile.getAttribute('data-tile-id');
        let letterScore = ScrabbleTiles[letter].value;

        tilesInWord.push(tile);

        const isNewTile = newTileIds.includes(tileId);
        if (isNewTile) {
          if (cell.classList.contains('double-letter')) {
            letterScore *= 2;
            bonuses.push("double letter");
          }
          if (cell.classList.contains('triple-letter')) {
            letterScore *= 3;
            bonuses.push("triple letter");
          }
          if (cell.classList.contains('double-word') || cell.classList.contains('center')) {
            wordMultiplier *= 2;
            bonuses.push("double word");
          }
          if (cell.classList.contains('triple-word')) {
            wordMultiplier *= 3;
            bonuses.push("triple word");
          }
        }
        wordScore += letterScore;
      }

      wordScore *= wordMultiplier;
      turnScore += wordScore;
      wordCount++;

      const bonusText = bonuses.length > 0 ? ` with bonuses: ${bonuses.join(", ")}` : "";
      showModal(`Your word "${word}" scored ${wordScore} points${bonusText}! Total score: ${currentScore + turnScore}`);

      completedWords.push(word);

      for (const placed of allPlacedTiles) {
        if (tilesInWord.includes(placed.tile)) {
          placed.validated = true;
        }
      }
    }

    currentScore += turnScore;
    scoreText.textContent = currentScore;
    currentTurnTiles = [];
    hasRefreshed = false;

    tileManager.replenishRack();
    updateLetterCounter();
  }

  function handleNewGame() {
    currentScore = 0;
    centerOccupied = false;
    completedWords = [];
    wordCount = 0;
    allPlacedTiles = [];
    currentTurnTiles = [];
    hasRefreshed = false;

    scoreText.textContent = currentScore;
    tileManager.restore();
    boardManager.build();
    rackElement.innerHTML = "";
    tileManager.replenishRack();
    updateLetterCounter();
  }

  function handleDiscard(event, ui) {
    const tile = ui.draggable[0];
    const letter = tile.getAttribute('data-letter');
    
    if (ScrabbleTiles[letter]) {
      ScrabbleTiles[letter]["number-remaining"]++;
    }

    tile.remove();
    tileManager.draw(1);
    updateLetterCounter();
  }

  function showModal(message) {
    modalMessage.textContent = message;
    notificationModal.classList.remove("hidden");
  }

  function updateLetterCounter() {
    const letters = Object.keys(ScrabbleTiles);
    const cells = letters.map(letter => {
      const info = ScrabbleTiles[letter];
      const remaining = info["number-remaining"];
      return `<td class="letter-cell"><span class="letter">${letter}:</span> <span class="count">${remaining}</span></td>`;
    }).join("");

    letterDisplay.innerHTML = `
      <h3>Letters Remaining</h3>
      <table>
        <tbody>
          <tr>${cells}</tr>
        </tbody>
      </table>`;
  }

  async function checkWordValidity(word) {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.ok;
    } catch {
      return false;
    }
  }

  tilesRefreshButton.addEventListener("click", handleRefresh);
  tileRecallButton.addEventListener("click", handleRecall);
  wordValidateButton.addEventListener("click", handleValidate);
  gameRestartButton.addEventListener("click", handleNewGame);
  modalCloseButton.addEventListener("click", () => notificationModal.classList.add("hidden"));
  
  $(garbageBin).droppable({
    accept: ".tile",
    drop: function(event, ui) {
      $(this).removeClass("drag-over");
      handleDiscard(event, ui);
    },
    over: function() {
      $(this).addClass("drag-over");
    },
    out: function() {
      $(this).removeClass("drag-over");
    }
  });

  tileManager.restore();
  boardManager.build();
  tileManager.replenishRack();
  updateLetterCounter();
});