<template>
  <v-container>
    <v-responsive class="align-center text-center">
      <h1 class="text-h2 font-weight-bold text-white mb-6">Vue ToDo List</h1>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="5">
          <v-card>
            <v-sheet color="grey-lighten-3" cols="12">
              <v-card-actions>
                <v-spacer></v-spacer>

                <span class="bg-info rounded-xl pl-2 pr-4 mx-1">
                  Tasks
                  &nbsp;
                  <v-badge
                    color="white"
                    :content="openTasksCount"
                    offset-y="-6.5"
                    offset-x="-5"
                  />
                </span>

                <span :class="`bg-info rounded-xl pl-2 pr-4 ml-1 ${completedTasksCount > 0 ? 'mr-2' : ''}`">
                  Tasks Done
                  &nbsp;
                  <v-badge
                    color="white"
                    :content="completedTasksCount"
                    offset-y="-6.5"
                    offset-x="-5"
                  />
                </span>

                <v-btn
                  size="small"
                  color="danger"
                  variant="flat"
                  class="text-none"
                  prepend-icon="mdi-delete"
                  v-show="completedTasksCount > 0"
                  @click="deleteCompletedTasks"
                  >
                  Tasks Done
                </v-btn>

                <v-btn
                  size="small"
                  color="danger"
                  variant="flat"
                  class="text-none"
                  prepend-icon="mdi-delete"
                  @click="deleteAllTasks"
                  >
                  Task
                </v-btn>
              </v-card-actions>
            </v-sheet>


            <v-hover v-slot="{ isHovering, props }">
              <v-virtual-scroll
                :items="tasks"
                height="200"
                item-height="10"
                :class="`pa-2 ma-2 task-list ${showScrollbar ? 'scrollbar-visible': ''}`"
                v-bind="props"
                @scroll="toggleScrollbarVisibility(isHovering)"
                @mouseout="showScrollbar = false"
              >
                <template v-slot:default="{ item }">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-scroll-x-transition>
                        <v-list-item
                          :key="item.id"
                          :value="item.id"
                          :color="`${ item.status.done ? 'grey-lighten-2' : '' }`"
                          cols="12"
                          v-bind="props"
                          border="sm"
                          class="rounded my-2 py-0"
                          :disabled="item.status.done"
                          :ripple="false"
                          >
                          <template v-slot:prepend>
                            <v-btn
                              :color="`${ item.status.done ? '' : 'green'}`"
                              icon="mdi-check-circle"
                              variant="text"
                              @click="taskDone(item)"
                              :disabled="item.status.done"
                            ></v-btn>
                          </template>

                          <v-list-item-title
                            :class="`text-start font-weight-medium ${item.status.done ? 'text-decoration-line-through text-grey-lighten-2' : ''}`"
                            >
                            {{ item.name }}
                          </v-list-item-title>

                          <template v-slot:append>
                            <v-btn
                              v-show="isHovering && !item.status.done"
                              color="danger"
                              icon="mdi-delete"
                              variant="text"
                              @click="deleteTask(item)"
                            ></v-btn>
                          </template>
                        </v-list-item>
                      </v-scroll-x-transition>
                    </v-hover>
                </template>
              </v-virtual-scroll>
            </v-hover>

            <v-divider></v-divider>

            <v-sheet color="grey-lighten-3">
              <v-card-text color="grey-lighten-3">
                <v-text-field
                  rounded
                  single-line
                  hide-details
                  type="text"
                  label="New Task"
                  class="task-custom-input"
                  density="compact"
                  variant="solo"
                  append-inner-icon="mdi-plus-circle"
                  v-model="taskName"
                  :loading="saving"
                  :disabled="saving"
                  @click:append-inner="addTask"
                ></v-text-field>
              </v-card-text>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
  export default {
    name: 'ToDoList',
    data() {
      return {
        loading: true,
        saving: false,
        deleting: false,
        showScrollbar: false,
        taskName: null,
        tasks: [],
      }
    },
    computed: {
      completedTasks() {
        return this.$store.getters['app/completedTasks']
      },
      openTasksCount() {
        return this.$store.getters['app/openTasks'].length
      },
      completedTasksCount() {
        return this.completedTasks.length
      },
    },
    created() {
      this.getTasks()
    },
    methods: {
      toggleScrollbarVisibility(isHovering) {
        this.showScrollbar = isHovering
      },
      async getTasks() {
        this.loading = true

        try {
          const resp = await this.$store.dispatch('app/getTasks')

          this.tasks = resp

          this.loading = false
        } catch (error) {
          this.loading = false
          console.error(error, 'fetching of tasks')
        }
      },
      async addTask() {
        if (this.saving || !this.taskName) {
          return
        }

        this.saving = true

        try {
          const resp = await this.$store.dispatch('app/addTasks', this.taskName)

          this.taskName = null
          this.saving = false
        } catch (error) {
          this.saving = false
          console.error(error, 'adding of task')
        }
      },
      async taskDone({ id }) {
        try {
          const resp = await this.$store.dispatch('app/taskDone', id)
        } catch (error) {
          console.error(error, 'setting of task to done')
        }
      },
      async deleteTask({ id }) {
        try {
          const resp = await this.$store.dispatch('app/deleteTask', id)
        } catch (error) {
          console.error(error, 'deleting of task')
        }
      },
      async deleteCompletedTasks() {

        if (this.deleting) {
          return
        }

        this.deleting = true

        try {
          const taskIds = this.completedTasks.map(({ id }) => id )

          const resp = await this.$store.dispatch('app/deleteMultipleTasks', taskIds)

          this.deleting = false

          this.getTasks()
        } catch (error) {
          this.deleting = false
          console.error(error, 'deleting of task')
        }
      },
      async deleteAllTasks() {

        if (this.deleting) {
          return
        }

        this.deleting = true

        try {
          const resp = await this.$store.dispatch('app/deleteAllTasks')

          this.deleting = false

          this.getTasks()
        } catch (error) {
          this.deleting = false
          console.error(error, 'deleting of task')
        }
      }
    }
  }
</script>

<style lang="scss">

/* Hide the scrollbar by default */
.task-list::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
}

/* Define the scrollbar thumb style */
.task-list::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
}

.task-list::-webkit-scrollbar-thumb:vertical {
  visibility: hidden; /* Initially hide the thumb */
}

.task-list.scrollbar-visible::-webkit-scrollbar-thumb:vertical {
  visibility: visible;
}

.task-custom-input .v-field {
  border: 2px solid #0D47A1;
}

.task-custom-input .v-field__append-inner {
  color: #0D47A1;
  font-size: 24px!important;
}

.task-custom-input .v-field__append-inner i {
  right: 5px;
  position: absolute;
}
</style>
