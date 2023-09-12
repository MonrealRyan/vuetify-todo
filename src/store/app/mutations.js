export function clearTasks(state) {
  state.tasks = []
}

export function addNewTasks(state, taskData) {
  state.tasks.push(taskData)
}

export function setTaskToDone(state, taskId) {
  // find task
  const task = state.tasks.find(({ id }) => id === taskId)
  // set status.done to true
  task.status.done = true
}

export function deleteTask(state, taskId) {
  // find task
  const taskIndex = state.tasks.findIndex(({ id }) => id === taskId)

  // remove from the list
  state.tasks.splice(taskIndex, 1)
}

