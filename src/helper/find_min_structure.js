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
        for (var i in structures ) {
            if ( min == null || structures[i].hits < min.hits) {
                min = structures[i];
            }
        }
    }

    return min;
}