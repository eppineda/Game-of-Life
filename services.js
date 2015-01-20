angular.module('gameoflife.services', [])
.factory('Game', function() {
    return {
        seed:function(coordinates, patterns) {
            if ('object' != typeof coordinates || 'object' != typeof patterns) return []

            var newCells = []
            var howMany = coordinates.length
            var makeCell = function(coordinate) {
                var c = null

                try { 
                    c = new Cell(coordinate.x, coordinate.y)
                }
                catch(CellException) {
                    console.error(CellException.message)
                    c = null
                }
                return c
            }

// Seed with the coordinates in the data entry table that don't have a pattern specified.

            for (var i = 0, j = howMany; i < j; ++i) {
                var c = makeCell(coordinates[i])

                if (null != c) newCells[i] = c
            } // for: i

// Seed with any patterns chosen, each located at the specified coordinate.

            for (var p in patterns)
                for (var c in patterns[p].cells)
                    newCells.push(patterns[p].cells[c])

            return newCells
        }, // seed
        nextGeneration:function(all) {
            var nextGen = [] // births + deaths
            var numFound = -1

// each cell (dead or alive) gets a list of its live neighbors.

            for (var a = 0, aMax = all.length; a < aMax; ++a) {
                try { numFound = all[a].findLiveNeighbors(all) }
                catch(CellException) { console.error(CellException.message) }
            } // for: a

// obtain a list of survivals, births and deaths.

            for (var a2 = 0, aMax = all.length; a2 < aMax; ++a2) {
                for (var t = 0, tMax = transitions.length; t < tMax; ++t) {
                    var afterTransition = transitions[t](all[a2])

                    if (null != afterTransition) {
                        nextGen.push(afterTransition)
                        break // state change, continue to next cell
                    }
                } // for: t
            } // for: a2
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
