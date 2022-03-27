
Room.prototype.addTask = function(task) {
    if (!this.memory.taskList) {
        this.memory.taskList = [];
    }
    this.memory.taskList.push(task);
}
