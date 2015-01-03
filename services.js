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

                var numFound = c.findNeighbors(newCells)

                console.log(numFound, ' neighbors located.', c)
                newCells[i] = c
            } // for: i
            return newCells
        }, // seed
        nextGeneration:function(all) {
            console.log('----Transitioning current generation of cells')
            // apply each rule to each cell, dead or alive

            var nextGen = [] // births + deaths
            var births = []
            var deaths = []
            var survivals = [] // no change, so we won't re-draw these
            for (var a = 0, b = all.length; a < b; ++a) {
                var afterTransition = null

                all[a].findNeighbors(all)
                for (var x = 0, y = transitions.length; x < y; ++x) {
                    afterTransition = transitions[x](all[a])
                    if (afterTransition.state != all[a].state) {
                        // state change
                        if (constants.alive == afterTransition.state)
                            births.push(afterTransition)
                        else
                            deaths.push(afterTransition)

                        nextGen.push(afterTransition)
                    }
                    else {
                        // no change in state
                        if (constants.alive == afterTransition.state)
                            survivals.push(afterTransition)
                    }
                } // for: x
            } // for: a
            console.log(survivals.length, ' survivals: ', survivals)
            console.log(births.length, ' births: ', births)
            console.log(deaths.length, ' deaths: ', deaths)
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
        },
        xScaler:function(cells) {
            var max = d3.max(cells, function(cell) {
                return cell.x
            })
            var f = d3.scale.linear().domain([0, max])
                .range([0, PlayField.extent.x])

            return f // a function that returns a scaled x-coordinate, given a domain value
        },
        yScaler:function(cells) {
            var max = d3.max(cells, function(cell) {
                return cell.y
            })
            var f = d3.scale.linear().domain([0, max])
                .range([0, PlayField.extent.y])

            return f // a function that returns a scaled y-coordinate, given a domain value
        }
    }
})
