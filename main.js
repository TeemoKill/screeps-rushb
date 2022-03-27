
const data = require('helper.data');

const createCreep = require('helper.create_creep');
const creepGoToWork = require('helper.creep_go_to_work');

const spawnRenewCreep = require('spawn.renew_creep');

const structureTower = require('structure.tower');

var sn = 30;

global.data = null;
global.creeps = null;

module.exports.loop = function () {
    const DATA = data();
    global.data = DATA;
    
    const harvesters = _.filter(Game.creeps, {memory: {role: global.types.harvester}});
    const upgraders = _.filter(Game.creeps, {memory: {role: global.types.upgrader}});
    const constructors = _.filter(Game.creeps, {memory: {role: global.types.constructor}});
    const transferers = _.filter(Game.creeps, {memory: {role: global.types.transferer}});

    global.creeps = {
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
        creepGoToWork(creep);
    });

    towers.forEach(tower => {
        structureTower.work(tower);
    });
}

scheduleSpawnTasks = function() {
    Object.values(Game.rooms).forEach(room => {
        const spawns = global.data.sp[room.name];
        spawns.forEach(spawn => {

            if (Game.time%10 == 0) {
                // only try to create creep if room energy is full
                if (room.energyAvailable == room.energyCapacityAvailable) {
                    if (global.creeps.harvesters.length < 1) {
                        createCreep(spawn, global.types.harvester);
                    }
                    else if (global.creeps.constructors.length < 1) {
                        createCreep(spawn, global.types.constructor);
                    }
                    else if (global.creeps.transferers.length < 1) {
                        createCreep(spawn, global.types.transferer);
                    }
                    else if (global.creeps.upgraders.length < 1) {
                        createCreep(spawn, global.types.upgrader);
                    }
                    else if (global.creeps.harvesters.length < 8) {
                        createCreep(spawn, global.types.harvester);
                    }
                    else if (global.creeps.transferers.length < 4) {
                        createCreep(spawn, global.types.transferer);
                    }
                    else if (global.creeps.upgraders.length < 2) {
                        createCreep(spawn, global.types.upgrader);
                    }
                    else if (global.creeps.constructors.length < 6) {
                        createCreep(spawn, global.types.constructor);
                    }
                }
            } 

            spawnRenewCreep(spawn);
        });
    });
}