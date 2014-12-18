/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

// coordinates and navigation

var constants = {
    "nw":"nw",
    "n":"n",
    "ne":"ne",
    "e":"e",
    "se":"se",
    "s":"s",
    "sw":"sw",
    "w":"w",
    "alive":"alive",
    "dead":"dead"
}

function nwOf(x, y) {
    return { "x":x - 1, "y":y + 1 }
}

function nOf(x, y) {
    return { "x":x, "y":y + 1 }
}

function neOf(x, y) {
    return { "x":x + 1, "y":y + 1 } 
}

function eOf(x, y) {
    return { "x":x + 1, "y":y }
}

function seOf(x, y) {
    return { "x":x + 1, "y":y - 1 }
}

function sOf(x, y) {
    return { "x":x, "y":y - 1 }
}

function swOf(x, y) {
    return { "x":x - 1, "y":y - 1 }
}

function wOf(x, y) {
    return { "x":x - 1, "y":y }
}

function oppositeOf(direction) {
    switch (direction) {
        case constants.nw:
            return constants.se
            break
        case constants.n:
            return constants.s
            break
        case constants.ne:
            return constants.sw
            break
        case constants.e:
            return constants.w
            break
        case constants.se:
            return constants.nw
            break
        case constants.s:
            return constants.n
            break
        case constants.sw:
            return constants.ne
            break
        case constants.w:
            return constants.e
            break
        default: throw { name:'CoordinateException', message:'\"' + direction + '\" is not a valid direction.' }
    }
}

function findCell(cells, x, y) {
    for (var i = 0, j = cells.length; i < j; ++i) {
        if (x == cells[i].x && y == cells[i].y)
            return cells[i]
    }
    return null
}

// cells

var Cell = function(x, y) {
    this.x = x
    this.y = y
    this.state = constants.alive
    this.neighbors = [] // no neighboring cells by default
}

Cell.prototype.addNeighbor = function(position) {
    var cell = null
    if (constants.nw != position &&
        constants.n  != position &&
        constants.ne != position &&
        constants.e  != position &&
        constants.se != position &&
        constants.sw != position &&
        constants.w)
        return null // not a valid position for a new cell
    cell = new Cell(position.x, position.y)
    this.neighbors[positon] = cell
    return cell
}

var Pattern = function() {
    this.cells = []
}
