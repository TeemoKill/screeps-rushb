
if (!global.filters) {
    global.filters = {};
}

global.filters.conteinerNotFull = function(structure) {
    return structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity() > 0;
}

global.filters.extentionOrSpawn = function(structure) {
    return structure.structureType == STRUCTURE_EXTENSION || 
    structure.structureType == STRUCTURE_SPAWN;
}

global.filters.extentionOrSpawnNotFull = function(structure) {
    return (structure.structureType == STRUCTURE_EXTENSION || 
        structure.structureType == STRUCTURE_SPAWN) && 
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
}

global.filters.towerNotFull = function(structure) {
    return structure.structureType == STRUCTURE_TOWER && 
    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
}
