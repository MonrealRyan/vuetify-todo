export function maxTaskId(state) {
  const tasksLenght = state.tasks.length
  if (tasksLenght > 0) {
    state.tasks.sort((a, b) => a.id - b.id);

    return (state.tasks[tasksLenght - 1].id || 0) + 1
  }

  return 1
}

export function tasks(state) {
  return state.tasks
}

export function openTasks(state) {
  return state.tasks.filter(({ status }) => status.done === false)
}

export function completedTasks(state) {
  return state.tasks.filter(({ status }) => status.done === true)
}
