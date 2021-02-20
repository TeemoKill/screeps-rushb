/*
 * find the container to withdraw
 */
module.exports = function (room) {
    var max = null;

    var structures = room.find(FIND_STRUCTURES, {
        filter: function(object) {
            return object.structureType == STRUCTURE_CONTAINER;
        }
    });

    if (structures.length) {
        for (var i in structures ) {
            if ( max == null || structures[i].store.getFreeCapacity() < max.store.getFreeCapacity()) {
                max = structures[i];
            }
        }
    }

    return max;
}