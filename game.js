/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

// coordinates, location and navigation

var constants = { // adjacent cells can occur horizontally, veritcally or diagonnally
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

var PlayField = {
    // these are pixels
    "origin.x":-1,
    "origin.y":-1,
    "extent.x":-1, 
    "extent.y":-1,
    // these are logical
    "max.x":-1,
    "max.y":-1,
    "cellSize":-1 // square
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
    if ('undefined' == x || isNaN(x) || 'undefined' == y || isNaN(y))
        throw { name:'CellException', message:'invalid coordinates' }
    this.x = x
    this.y = y
    this.state = constants.alive
    this.neighbors = [] // no neighboring cells by default
}

Cell.prototype.addNeighbor = function(position, cell) {
    if (constants.nw != position &&
        constants.n  != position &&
        constants.ne != position &&
        constants.e  != position &&
        constants.se != position &&
        constants.s  != position &&
        constants.sw != position &&
        constants.w  != position)
        throw { name:'CoordinateException', message:'\"' + position + '\" is not a valid direction.' }
    this.neighbors[position] = cell
    cell.neighbors[oppositeOf(position)] = this // commutative relationship between cells
} // addNeighbor

Cell.prototype.createNeighbor = function(position) {
    var cell = null
    if (constants.nw != position &&
        constants.n  != position &&
        constants.ne != position &&
        constants.e  != position &&
        constants.se != position &&
        constants.sw != position &&
        constants.w)
        throw { name:'CoordinateException', message:'\"' + direction + '\" is not a valid direction.' }
    cell = new Cell(position.x, position.y)
    if (constants.alive != cell.state)
        throw { name:'CellException', message:'Dead cell created.' }
    this.addNeighbor(position, cell)
    return cell
} // createNeighbors

Cell.prototype.findNeighbors = function(cells) {
    var lookWhere = [ constants.nw, constants.n, constants.ne, constants.e, constants.se,
                      constants.s, constants.sw, constants.w ]

    for (there in lookWhere) {
        var whereAt

        switch (lookWhere[there]) {
            case constants.nw:
                whereAt = nwOf(this.x, this.y)
                break
            case constants.n:
                whereAt = nOf(this.x, this.y)
                break
            case constants.ne:
                whereAt = neOf(this.x, this.y)
                break
            case constants.e:
                whereAt = eOf(this.x, this.y)
                break
            case constants.se:
                whereAt = seOf(this.x, this.y)
                break
            case constants.s:
                whereAt = sOf(this.x, this.y)
                break
            case constants.sw:
                whereAt = swOf(this.x, this.y)
                break
            case constants.w:
                whereAt = wOf(this.x, this.y)
                break
        } // switch

        var found = findCell(cells, whereAt.x, whereAt.y)

        if (null == found) continue
        try {
            this.addNeighbor(lookWhere[there], found)
        }
        catch(CoordinateException) {
            console.error(CoordinateException.message)
        }
        console.log('neighbors', this, '<-->', found)
    } // for: there
    return this.neighbors.length
} // findNeighbors

var Pattern = function() {
    this.cells = [] // none in this pattern by default
}

// transitions

var transitions = []
var fewerThanTwo = function(cell) {
    if (constants.alive == cell.state && 2 > cell.neighbors.length)
        cell.state = constants.dead
    console.log("fewerThanTwo", cell, cell.neighbors.length)
    return cell
}
var twoOrThree = function(cell) {
    if (constants.alive == cell.state && (2 == cell.neighbors.length || 3 == cell.neighbors.length))
        cell.state = constants.alive
    console.log("twoOrThree", cell, cell.neighbors.length)
    return cell
}
var moreThanThree = function(cell) {
    if (constants.alive == cell.state && 3 < cell.neighbors.length)
        cell.state = constants.dead
    console.log("moreThanThree", cell, cell.neighbors.length)
    return cell
}
var exactlyThree = function(cell) {
    if (constants.dead == cell.state && 3 == cell.neighbors.length)
        cell.state = constants.alive
    console.log("exactlyThree", cell, cell.neighbors.length)
    return cell
}

transitions.push(fewerThanTwo)
transitions.push(twoOrThree)
transitions.push(moreThanThree)
transitions.push(exactlyThree)
