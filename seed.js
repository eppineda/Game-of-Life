/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

// This tests low-level cell behavior.

/**
 * @param howMany cells would you like to seed with?
 * @param maxX maximum value of X in a 2-D coordinate system
 * @param maxY maximum value of Y in a 2-D coordinate system
 */
function seed(howMany, maxX, maxY) {
    var newCells = []
    for (var i = 0, j = howMany; i < j; ++i) {
        var c = new Cell(Math.floor(Math.random() * (maxX)),
            Math.floor(Math.random() * (maxY))) // todo: chance of duplicate cell

        c.findNeighbors(newCells)
        newCells[i] = c
    } // for: i
    return newCells
}
