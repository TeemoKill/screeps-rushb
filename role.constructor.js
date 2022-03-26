const findMinStructure = require('helper.find_min_structure');

var roleConstructor = {

    /** @param {Creep} creep **/
    run: function(creep) {
		// creep checks whether need recharging
	    if (!creep.memory.recharge && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.recharge = true;
            creep.say('🔄 recharge');
	    } else if (creep.memory.recharge && creep.store.getFreeCapacity() == 0) {
	        creep.memory.recharge = false;
	        creep.say('🚧 build');
	    }

	    if (creep.memory.recharge) {
			var target = creep.pos.findClosestByPath(FIND_STRUCTURES, 
				{
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER) &&
							structure.store[RESOURCE_ENERGY] > 0;
					}
				}
			);
			// if (target) {
			//     creep.memory.mode = 'withdraw';
			// }
			// else {
			//     creep.memory.mode = 'harvest';
			// 	target = creep.pos.findClosestByPath(FIND_SOURCES, {
    	    //         filter: (source) => {
    	    //             return source.energy > 0;
    	    //         }
	        //     });
			// }
            if (target) {
                // if (creep.memory.mode == 'withdraw') {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    // }
                }
                // else if (creep.memory.mode == 'harvest') {
                //     if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                //     }
                // }
            }
			else {
				// currently no energy resource,
				// find a container and go to wait
				target = creep.pos.findClosestByPath(FIND_STRUCTURES, 
					{
						filter: (structure) => {
							return (structure.structureType == STRUCTURE_CONTAINER);
						}
					}
				);
				if (target) {
					creep.moveTo(target);
				}
			}
	    }
	    else {
			var destination = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, 
				{
					filter: (structure) => {
						return structure.structureType == STRUCTURE_CONTAINER;
					}
				}
			);
			if (!destination) {
				destination = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, 
					{
						filter: (structure) => {
							return structure.structureType == STRUCTURE_EXTENSION;
						}
					}
				);
			}
			if (!destination) {
				destination = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			}
			if (destination) {
				creep.memory.mode = 'construct';
			} 
			else 
			{
				destination = findMinStructure(creep.room);
				if (destination) {
					creep.memory.mode = 'repair';
				}
			}
            if (destination) {
				if (creep.memory.mode == 'construct') {
					if(creep.build(destination) == ERR_NOT_IN_RANGE) {
						creep.moveTo(destination, {visualizePathStyle: {stroke: '#ffffff'}});
					}
				}
				else if (creep.memory.mode == 'repair') {
					var needRepair = creep.pos.findInRange(FIND_STRUCTURES, 2, 
						{
							filter: (structure) => {
								return structure.hits < structure.hitsMax - 300;
							}
						}
					);
					needRepair.forEach(structure => {
						creep.repair(structure);
					});
					if(creep.repair(destination) == ERR_NOT_IN_RANGE) {
						creep.moveTo(destination, {visualizePathStyle: {stroke: '#ffffff'}});
					}
				}
                
			}
			else{
				creep.moveTo(Game.flags['ConstructorStation1'], {visualizePathStyle: {stroke: '#00ffaa'}});
			}
	    }
	}
};

module.exports = roleConstructor;