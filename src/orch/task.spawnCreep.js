
var tools = require('orch.tools');

if (!global.orchTask) {
    global.orchTask = {};
}
global.orchTask.spawnCreep = {};

var spawnCreep = {

    taskType: null,

    taskPublish: function(cID, taskType, roomList, requirement, details) {
        tools.mainTaskIssue(cID, taskType, roomList, requirement, details);
    },

    /** @param {Array} rooms */
    taskGet: function(rooms) {
        global.orchTask.spawnCreep.tmpMaxNumber = -100;
        global.orchTask.spawnCreep.rooms = rooms;
        global.orchTask.spawnCreep.funcRoomFilter = this.roomFilter;
        global.orchTask.spawnCreep.funcPriorityFilter = this.priorityFilter;

        var tasks = tools.getTaskByType(this.taskType).filter(this.taskFilter);
        if (tasks.length > 0) {
            return tasks[0];
        } else {
            return null;
        }
    },

    taskFilter: function(taskID) {
        if (this.roomFilter(taskID)) {
            return this.priorityFilter(taskID);
        }
        return false;
    },

    roomFilter: function(taskID) {
        if (tools.getTask(taskID).roomList.length == 0) {
            return true;
        }
        if (global.orchTask.spawnCreep.roomList.length == 0) {
            return true;
        }
        for (var r in global.orchTask.spawnCreep.roomList) {
            if (tools.getTask(taskID).roomList.indexOf(global.orchTask.spawnCreep.roomList[r]) != -1) {
                return true;
            }
        }
        return false;
    },

    priorityFilter: function(taskID) {
        var task = tools.getTask(taskID);
        if (!task) {
            return false;
        }
        if (typeof(task.details.priority) == 'undefined') {
            task.details.priority = 0;
        }
        if (global.orchTask.tmpMaxNumber < task.details.priority) {
            global.orchTask.tmpMaxNumber = task.details.priority;
            return true;
        }
        return false;
    },
}

module.exports = spawnCreep;
