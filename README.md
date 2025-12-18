# Scrabble Game by John Wesley Agojo - HW5

Email: johnwesley_agojo@student.uml.edu

## Links

- GitHub Repository: https://github.com/jwagojo/HW5-GUI

Github Link: 

### Extra Features Implementation

- Instead of a single row, I implemented the 15x15 full Scrabble board.
- Drag unwanted tiles to discard them in the garbage Bin.
- Recall Tile button to undo last tile placement.
- Letter counter display showing remaining tiles.
- Uses Dictionary API to validate words.
- Instructions panel.

## Button Functionalities

### Validate Word

Once you place the tiles on the board, press Validate word to verify the word formation. This will then use the dictionary api to check if the word that was placed is an actual word.

### New Game

Pressing this button will do a complete game reset. 

- Clears the board of tiles.
- Resets tile distribution to original state.
- Resets the score.
- Resets the word count.
- Regenerates a new rack of tiles.

### Recall Tile

Allows the user to undo their last tile placement on the board, so that if the user accidentally places a tile in the wrong spot, the tile is then recalled back to the rack.game balance.

### Refresh Tiles

Pressing this button will refreshes the rack with new tiles.

### Garbage Bin

Dragging tiles to the bin will discard those tiles.

# status

all functions are working properly.
