
require('creeplife.go_to_work');
require('global.filters');
require('spawn.renew_creep');
require('structure.tower');

const data = require('helper.data');

const createCreep = require('helper.create_creep');

const utils = require('utils');

g = global;
g.data = null;
g.creeps = null;
g.debug = false;

g.orch = require('orch.taskOrchestrator');

utils.info("[main] initialization done");

module.exports.loop = function () {
    const DATA = data();
    g.data = DATA;

    if (Game.time%500 == 0) {
        recycleDeadCreepMemory();
    }
    
    const harvesters = _.filter(Game.creeps, {memory: {role: global.types.harvester}});
    const upgraders = _.filter(Game.creeps, {memory: {role: global.types.upgrader}});
    const constructors = _.filter(Game.creeps, {memory: {role: global.types.constructor}});
    const transferers = _.filter(Game.creeps, {memory: {role: global.types.transferer}});

    g.creeps = {
        harvesters: harvesters,
        upgraders: upgraders,
        constructors: constructors,
        transferers: transferers,
    }

    const towers = _.filter(Game.structures, {structureType: STRUCTURE_TOWER});
    
    if (Game.time%20 == 0) {
        console.log("creeps: " + Object.values(Game.creeps).length);
        console.log(
            "harvesters: " + harvesters.length + 
            ", transferers: " + transferers.length + 
            ", upgraders: " + upgraders.length + 
            ", constructors: " + constructors.length
        );
    }

    scheduleSpawnTasks();

    Object.values(Game.creeps).forEach(creep => {
        creep.goToWork();
    });

    towers.forEach(tower => {
        tower.work();
    });
}

scheduleSpawnTasks = function() {
    Object.values(Game.rooms).forEach(room => {
        const spawns = global.data.sp[room.name];
        spawns.forEach(spawn => {

            if (Game.time%10 == 0) {
                // only try to create creep if room energy is full
                if (room.energyAvailable == room.energyCapacityAvailable) {
                    if (g.creeps.harvesters.length < 1) {
                        createCreep(spawn, g.types.harvester);
                    }
                    else if (g.creeps.constructors.length < 1) {
                        createCreep(spawn, g.types.constructor);
                    }
                    else if (g.creeps.transferers.length < 1) {
                        createCreep(spawn, g.types.transferer);
                    }
                    else if (g.creeps.upgraders.length < 1) {
                        createCreep(spawn, g.types.upgrader);
                    }
                    else if (g.creeps.harvesters.length < 5) {
                        createCreep(spawn, g.types.harvester);
                    }
                    else if (g.creeps.transferers.length < 3) {
                        createCreep(spawn, g.types.transferer);
                    }
                    else if (g.creeps.upgraders.length < 3) {
                        createCreep(spawn, g.types.upgrader);
                    }
                    else if (g.creeps.constructors.length < 3) {
                        createCreep(spawn, g.types.constructor);
                    }
                }
            } 

            spawn.processRenewList();
        });
    });
}

recycleDeadCreepMemory = function() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            utils.info(
                "[recycleDeadCreepMemory] deleted creep memory: " + name,
            )
        }
    }
}
