
if (!global.filters) {
    global.filters = {};
}

export const f = global.filters

f.all = function(structure) {
    return true;
}

f.container = function(structure) {
    return structure.structureType == STRUCTURE_CONTAINER;
}

f.containerNotFull = function(structure) {
    return structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity() > 0;
}

f.containerNotEmpty = function(structure) {
    return structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity() > 0;
}

f.storageNotFull = function(structure) {
    return structure.structureType == STRUCTURE_STORAGE && 
    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
}

f.storageNotEmpty = function(structure) {
    return structure.structureType == STRUCTURE_STORAGE &&
    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
}

f.extention = function(structure) {
    return structure.structureType == STRUCTURE_EXTENSION;
}

f.extentionOrSpawn = function(structure) {
    return structure.structureType == STRUCTURE_EXTENSION || 
    structure.structureType == STRUCTURE_SPAWN;
}

f.extentionOrSpawnNotFull = function(structure) {
    return (structure.structureType == STRUCTURE_EXTENSION || 
        structure.structureType == STRUCTURE_SPAWN) && 
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
}

f.towerNotFull = function(structure) {
    return structure.structureType == STRUCTURE_TOWER && 
    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
}
