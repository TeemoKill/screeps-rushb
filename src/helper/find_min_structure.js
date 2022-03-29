/*
 * find the wall / rampart to repair
 */
export const findMinStructure = function (room) {
    var min = null;

    var structures = room.find(FIND_STRUCTURES, {
        filter: function(structure) {
            return (structure.structureType == STRUCTURE_WALL ||
                structure.structureType == STRUCTURE_RAMPART || 
                structure.structureType == STRUCTURE_ROAD || 
                structure.structureType == STRUCTURE_CONTAINER) && 
                structure.hits < structure.hitsMax - 500;
        }
    });

    if (structures.length) {
        min = structures.reduce(function(a, b) {
            return a.hits < b.hits ? a : b;
        });
    }

    return min;
}