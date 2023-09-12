function get(key) {
  return localStorage.getItem(key)
}

function set(key, value) {
  localStorage.setItem(key, value)
}

function exists() {
  return !!get()
}

function remove(key) {
  return localStorage.removeItem(key)
}

function init() {
  if (get()) {
    set(get())
  } else {
    remove()
  }
}

export const token = {
  get,
  set,
  exists,
  remove,
  init,
}
