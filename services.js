/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.services', [])
.factory('Game', function() {
    return {
        seed:function(coordinates) {
            var howMany = coordinates.length
            var newCells = []
            for (var i = 0, j = howMany; i < j; ++i) {
                var c = null
                
                try { c = new Cell(coordinates[i].x, coordinates[i].y) }
                catch (CellException) { console.error(CellException.message) }

                c.findNeighbors(newCells)
                newCells[i] = c
            } // for: i
            return newCells
        }, // seed
        nextGeneration:function(currentGen) {
            console.log('----Transitioning current generation of cells')
            // apply each rule to each cell

            var cells = currentGen
            var nextGen = []
            for (var a = 0, b = cells.length; a < b; ++a) {
                var afterTransition = null

                for (var x = 0, y = transitions.length; x < y; ++x) {
                    afterTransition = transitions[x](cells[a])
                }
                nextGen.push(afterTransition)
            }
            return nextGen
        } // nextGeneration
    } // return
})
.factory('Plotter', function() {
    return {
        rasterToLogical:function(r) {
            return Math.ceiling(r / PlayField.cellSize)
        },
        logicalToRaster:function(l) {
            return l * PlayField.cellSize
        }
    }
})
