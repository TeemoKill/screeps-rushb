
import '../room/tasks'

export const orchTools = {

    consts: {
        TASK_IDLE: 0,
        TASK_DOING: 1,
        TASK_DONE: 2,
        TASK_FAIL: 3,
        TASK_EXPIRED: 4,
        TASK_CANCEL: 5,
    },

    mainTaskIssue: function(clientID, taskType, roomList, requirement, details) {
        var task = {
            'clientID': clientID,
            'taskType': taskType,
            'roomList': roomList,
            'requirement': requirement,
            'remainRequirement': requirement,
            'details': details,
            'subTasks': {},
        }

        var taskID = Game.time + '_' + this.getGlobalHash();
        for (var i in rooms) {
            var r = new Room(rooms[i]);
            r.addTask(task);
        }
        Memory.taskOrch.taskListTyped[taskType].push(taskID);
        Memory.taskOrch.taskList[taskID] = task;

        return taskID;
    },

    subTaskIssue: function(taskID, requirement) {
        var subRequirement;
        if (Memory.taskOrch.taskList[taskID].requirement > 0) {
            subRequirement = Math.min(Memory.taskOrch.taskList[taskID].requirement, requirement);
            Memory.taskOrch.taskList[taskID].requirement -= subRequirement;
        } else {
            return null;
        }

        var subTask = {
            'heartbeat': Game.time,
            'status': this.consts.TASK_IDLE,
            'requirement': subRequirement,
        }

        var subTaskID = Game.time + '_' + this.getGlobalHash();
        Memory.taskOrch.taskList[taskID].subTasks[subTaskID] = subTask;

        return subTaskID;
    },

    getTask: function(taskID) {
        return Memory.taskOrch.taskList[taskID];
    },

    getTaskByType: function(taskType) {
        return Memory.taskOrch.taskListTyped[taskType].filter(this.taskReqNotZero);
    },

    /** @param {Room} room */
    getTaskByRoom: function(room) {
        if (!room.memory.taskList) {
            return [];
        }
        return room.memory.taskList.filter(this.taskReqNotZero);
    },

    /** @param {string} roomName */
    getTaskByRoomName: function(roomName) {
        if (!Memory.rooms[roomName]) {
            return [];
        }
        return Memory.rooms[roomName].taskList.filter(this.taskReqNotZero);
    },

    shouldCalcelTask: function(taskID, subTaskID) {
        var task = this.getTask(taskID);
        if (task) {
            if (subTaskID) {
                if (task.subTasks[subTaskID]) {
                    return false;
                }
                // if the task has no subtask remain, cancel the task
                return true;
            } else {
                // if there is no subtask scheduled, we keep the task
                return false;
            }
        } else {
            // can not find the task in memory, cancel the task
            return true;
        }
    },

    taskChangeRequirement: function(taskID, reqDelta) {
        var task = this.getTask(taskID);
        if (task) {
            task.requirement += reqDelta;
            task.remainRequirement += reqDelta;
        }
        return ERR_NOT_FOUND;
    },

    getTaskRequirement: function(taskID) {
        var task = this.getTask(taskID);
        if (task) {
            return task.requirement;
        }
        return ERR_NOT_FOUND;
    },

    getTaskRemainRequirement: function(taskID) {
        var task = this.getTask(taskID);
        if (task) {
            return task.remainRequirement;
        }
        return ERR_NOT_FOUND;
    },

    subTask_GetStatus: function(taskID, subTaskID) {
        var task = this.getTask(taskID);
        if (task) {
            if (task.subTasks[subTaskID]) {
                if (task.subTasks[subTaskID].heartbeat+50 < Game.time) {
                    return this.consts.TASK_EXPIRED;
                }
                return task.subTasks[subTaskID].status;
            }
            return ERR_NOT_FOUND;
        }
        return ERR_NOT_FOUND;
    },

    subTask_SetFail: function(taskID, subTaskID) {
        var task = this.getTask(taskID);
        if (task) {
            if (task.subTasks[subTaskID]) {
                task.requirement += task.subTasks[subTaskID].requirement;
                task.subTasks.delete(subTaskID);
            }
            return ERR_NOT_FOUND;
        }
        return ERR_NOT_FOUND;
    },

    subTask_SetDone: function(taskID, subTaskID) {
        var task = this.getTask(taskID);
        if (task) {
            if (task.subTasks[subTaskID]) {
                task.remainRequirement -= task.subTasks[subTaskID].requirement;
                task.subTasks.delete(subTaskID);
            }
            return ERR_NOT_FOUND;
        }
        return ERR_NOT_FOUND;
    },

    subTask_Refresh: function(taskID, subTaskID) {
        var task = this.getTask(taskID);
        if (task) {
            if (task.subTasks[subTaskID]) {
                task.subTasks[subTaskID].heartbeat = Game.time;
            }
            return ERR_NOT_FOUND;
        }
        return ERR_NOT_FOUND;
    },

    mainTask_SetDone: function(taskID) {
        _.remove(Memory.taskOrch.taskListTyped[Memory.taskOrch.taskList[taskID].taskType], (id) => {return id == taskID;});
        for (var r in Memory.taskOrch.taskList[taskID].roomList) {
            _.remove(Memory.rooms[Memory.taskOrch.taskList[taskID].roomList[r]].taskList, (id) => {return id == taskID;});
        }
        Memory.taskOrch.taskList.delete(taskID);
    },

    getGlobalHash: function() {
        if (typeof(ORCHTOOLS_GLOBAL_HASH) == 'undefined') {
            ORCHTOOLS_GLOBAL_HASH = 0;
        } else {
            ORCHTOOLS_GLOBAL_HASH++;
        }
        return ORCHTOOLS_GLOBAL_HASH;
    },

    taskReqNotZero: function(taskID) {
        var task = this.getTask(taskID);
        if (task) {
            return task.requirement > 0;
        }
        return ERR_NOT_FOUND;
    },
};
