/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.services', [])
.factory('Game', function() {
    return {
        seed:function(gridWidth, gridHeight, coordinates) {
            var howMany = coordinates.length
            var maxX = gridWidth
            var maxY = gridHeight
            var newCells = []
            for (var i = 0, j = howMany; i < j; ++i) {
                var c = null
                
                try { c = new Cell(coordinates[i].x, coordinates[i].y) }
                catch (CellException) { console.error(CellException.message) }

                c.findNeighbors(newCells)
                newCells[i] = c
            } // for: i
            return newCells
        }
    }
})
