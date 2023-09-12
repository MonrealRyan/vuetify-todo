
export function addTasks({ commit, getters }, taskName) {
    const newTask = {
        id: getters.maxTaskId,
        name: taskName,
        status : {
            done: false
        }
    }

    commit('addNewTasks', newTask)

    return Promise.resolve(newTask)
}

export function getTasks({ getters }) {
    return Promise.resolve(getters.tasks)
}

export function taskDone({ commit, getters }, taskId) {
    commit('setTaskToDone', taskId)

    return Promise.resolve(getters.tasks)
}

export function deleteTask({ commit, getters }, taskId) {
    commit('deleteTask', taskId)

    return Promise.resolve(getters.tasks)
}

export function deleteMultipleTasks({ commit, getters }, taskIds) {
    taskIds.forEach((taskId) => {
        commit('deleteTask', taskId)
    })

    return Promise.resolve(getters.tasks)
}

export function deleteAllTasks({ commit, getters }) {
    commit('clearTasks')

    return Promise.resolve(getters.tasks)
}