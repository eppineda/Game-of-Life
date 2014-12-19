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
        var c = new Cell(Math.floor(Math.random() * (maxX + 1)),
            Math.floor(Math.random() * (maxY + 1))) // todo: chance of duplicate cell
        var lookWhere = [ constants.nw, constants.n, constants.ne, constants.e, constants.se,
                          constants.s, constants.sw, constants.w ]

        // todo: move this for loop to game.js
        for (there in lookWhere) {
            var whereAt

            switch (lookWhere[there]) {
                case constants.nw:
                    whereAt = nwOf(c.x, c.y)
                    break
                case constants.n:
                    whereAt = nOf(c.x, c.y)
                    break
                case constants.ne:
                    whereAt = neOf(c.x, c.y)
                    break
                case constants.e:
                    whereAt = eOf(c.x, c.y)
                    break
                case constants.se:
                    whereAt = seOf(c.x, c.y)
                    break
                case constants.s:
                    whereAt = sOf(c.x, c.y)
                    break
                case constants.sw:
                    whereAt = swOf(c.x, c.y)
                    break
                case constants.w:
                    whereAt = wOf(c.x, c.y)
                    break
            } // switch

            var found = findCell(newCells, whereAt.x, whereAt.y)

            if (null == found) continue
            try {
                c.addNeighbor(lookWhere[there], found)
            }
            catch(CoordinateException) {
                console.error(CoordinateException.message)
            }
            console.log('neighbors', c, '<-->', found)
        } // for: there
        newCells[i] = c
    } // for: i
    return newCells
}
