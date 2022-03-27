
global.types = {
    harvester: 0,
    transferer: 1,
    upgrader: 2,
    constructor: 3,
}

global.roleName = {
    0: 'harvester',
    1: 'transferer',
    2: 'upgrader',
    3: 'constructor',
}

global.bodyPartCost = {
    MOVE: 50,
    WORK: 100,
    CARRY: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    TOUGH: 10,
    CLAIM: 600,
}

/** @param {Number} role @param {Number} availableEnergy */
module.exports = function (role, availableEnergy) {
    var body;
    switch (role) {
        case global.types.harvester:
            // body = makeBody('WWWWWWWCM');
            // body = makeBody('WWWCM');
            return makeBody_Harvester(availableEnergy);
        case global.types.transferer:
            // body = makeBody('WCCCCCCCCMMMMMM');
            // body = makeBody('WCCCCCMMM');
            return makeBody_Transferer(availableEnergy);
        case global.types.upgrader:
            // body = makeBody('WWWCCCCCMMMM'); 
            // body = makeBody('WWCCCCMMM'); 
            return makeBody_Upgrader(availableEnergy);
        case global.types.constructor:
            // body = makeBody('WWWWCCCCMMMM');
            // body = makeBody('WWCCCMMM');
            return makeBody_Constructor(availableEnergy);
        default:
            console.log('helper.body: role not exist!');
            body = null;
    }
    return body;
}

/** @param {Array} bodyStr */
makeBody = function (bodyStr) {
    var body = [];

    for (var i in bodyStr) {
        if (bodyStr[i] != ' ') {
            body.push(bodyParts[bodyStr[i]]);
        }
        if (body.length == 50) {
            break;
        }
    }

    return body;
    
}

/** @param {Number} availableEnergy */
makeBody_Harvester = function (availableEnergy) {
    var body = [];

    // at least give a move part
    if (availableEnergy >= global.bodyPartCost.MOVE) {
        body.push(MOVE);
        availableEnergy -= global.bodyPartCost.MOVE;
    }

    // give a necessary carry part
    if (availableEnergy >= global.bodyPartCost.CARRY) {
        body.push(CARRY);
        availableEnergy -= global.bodyPartCost.CARRY;
    }

    // use all the rest energy for work part
    while (availableEnergy >= global.bodyPartCost.WORK) {
        body.push(WORK);
        availableEnergy -= global.bodyPartCost.WORK;
    }

    return body;
}

/** @param {Number} availableEnergy */
makeBody_Transferer = function (availableEnergy) {
    var body = [];

    equivCost_Carry = global.bodyPartCost.CARRY + global.bodyPartCost.MOVE/2;
    equivCost_Work = global.bodyPartCost.WORK + global.bodyPartCost.MOVE/2;

    carryPartCount = Math.floor((availableEnergy-equivCost_Work) / equivCost_Carry);

    // transferer only needs one necessary work part
    if (availableEnergy >= global.bodyPartCost.WORK) {
        body.push(WORK);
        availableEnergy -= global.bodyPartCost.WORK;
    }

    // put carry parts
    for (var i = 0; i < carryPartCount; i++) {
        body.push(CARRY);
        availableEnergy -= global.bodyPartCost.CARRY;
    }

    // use all the rest energy for move parts
    while (availableEnergy >= global.bodyPartCost.MOVE) {
        body.push(MOVE);
        availableEnergy -= global.bodyPartCost.MOVE;
    }

    return body;
}

/** @param {Number} availableEnergy */
makeBody_Upgrader = function (availableEnergy) {
   var body = [];

    // one move part can carry 2 other parts
    // we need work:carry ratio 1/2, but at least one work part
    // the number of parts not exceeding 2 times move parts
    equivCost_Work = global.bodyPartCost.WORK + global.bodyPartCost.MOVE/2;
    movablePartCount = 0;

    workPartCount = Math.max(
        Math.floor(availableEnergy / (3*equivCost_Work)), 1
    );

    // put work parts
    for (var i = 0; i < workPartCount; i++) {
        body.push(WORK);
        availableEnergy -= global.bodyPartCost.WORK;
        movablePartCount -= 1;
    }

    // put move parts
    while (availableEnergy >= global.bodyPartCost.MOVE) {
        body.push(MOVE);
        availableEnergy -= global.bodyPartCost.MOVE;
        // each move part can move 2 other parts
        movablePartCount += 2;
        // put carry parts while movability is enough and have energy
        while (movablePartCount > 0 && availableEnergy >= global.bodyPartCost.CARRY) {
            body.push(CARRY);
            availableEnergy -= global.bodyPartCost.CARRY;
            movablePartCount -= 1;
        }
    }

    return body;
}

/** @param {Number} availableEnergy */
makeBody_Constructor = function (availableEnergy) {
    var body = [];

    // constructor needs balanced abilities
    partGroupCost = global.bodyPartCost.MOVE + global.bodyPartCost.WORK + global.bodyPartCost.CARRY;
    partGroupCount = Math.floor(availableEnergy / partGroupCost);

    for (var i = 0; i < partGroupCount; i++) {
        body.push(MOVE);
        body.push(WORK);
        body.push(CARRY);
    }

    return body;
}