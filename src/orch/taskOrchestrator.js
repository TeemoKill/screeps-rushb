
import { orchTools as tools } from './tools';

import { spawnCreep } from './task/spawnCreep'

export const taskOrchestrator = {

    availableTasks: {
        spawnCreep: spawnCreep,
    },

    init: function() {
        if (!Memory.taskOrch) {
            Memory.taskOrch = {};
        }

        if (!Memory.taskOrch.taskList) {
            Memory.taskOrch.taskList = {};
        }
        if (!Memory.taskOrch.taskListTyped) {
            Memory.taskOrch.taskListTyped = {};
        }
        for (var taskType in this.availableTasks) {
            if (!Memory.taskOrch.taskListTyped[taskType]) {
                Memory.taskOrch.taskListTyped[taskType] = [];
            }
        }
    },

    run: function() {
        if (Game.time % 100 == 0) {
            for (var taskID in Memory.taskOrch.taskList) {
                task = tools.getTask(taskID);
                if (!task) {
                    tools.mainTask_SetDone(taskID);
                }

                var subTaskCount = 0;
                for (var subTaskID in task.subTasks) {
                    switch (tools.subTask_GetStatus(taskID, subTaskID)) {
                        case tools.consts.TASK_EXPIRED:
                            tools.subTask_SetFail(taskID, subTaskID);
                            break;
                        case tools.consts.TASK_DONE:
                            tools.subTask_SetDone(taskID, subTaskID);
                            break;
                        case tools.consts.TASK_FAIL:
                            tools.subTask_SetFail(taskID, subTaskID);
                            break;
                        default:
                            subTaskCount++;
                            break;
                    }
                }

                if (subTaskCount == 0 && task.requirement == 0) {
                    tools.mainTask_SetDone(taskID);
                }
            }
        }
    },

};

// do init upon module load
taskOrchestrator.init();
