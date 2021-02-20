
const body = require('helper.body');

module.exports = function (spawn, role) {
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