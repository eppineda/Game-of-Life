/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

/**
 * @param howMany cells would you like to seed with?
 * @param maxX maximum value of X in a 2-D coordinate system
 * @param maxY maximum value of Y in a 2-D coordinate system
 */
function seed(howMany, maxX, maxY) {
    var newCells = []
    for (var i = 0, j = howMany; i < j; ++i) {
        newCells[i] = new Cell(Math.floor(Math.random() * (maxX + 1)),
                               Math.floor(Math.random() * (maxY + 1)))
    }
    return newCells
}
