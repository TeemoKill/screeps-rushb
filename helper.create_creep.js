
const body = require('helper.body');
const { isNull, isUndefined } = require('lodash');

module.exports = function (spawn, role) {
    // console.log(isUndefined(spawn.Spawning));
    // console.log(spawn.Spawning);
    if (isUndefined(spawn.Spawning)) {
        console.log('create_creep');
        console.log(spawn + role);
        var creepBody = body(role);
        console.log(creepBody);
        var sn = Math.ceil(Math.random() * 10000);
        spawn.spawnCreep(creepBody, role + sn, {
            memory: {role: role,
                recharge: true}
        });
    }
}