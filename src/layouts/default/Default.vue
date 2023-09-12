<template>
  <v-app class="background-gradient">
    <v-layout class="rounded rounded-md">
      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <router-view />
      </v-main>

      <v-layout-item
        class="text-end pointer-events-none"
        model-value
        position="bottom"
        size="88"
      >
        <div class="mx-4">
          <v-fab-transition v-if="!showInfo">
              <v-btn
                class="mt-auto pointer-events-initial text-none"
                color="primary"
                elevation="12"
                @click="showInfo = true"
              >
                Show Info
              </v-btn>
          </v-fab-transition>

          <v-fab-transition v-if="showInfo">
            <span class="bg-deep-purple-darken-4 rounded-xl pl-3 pr-2 py-2 mx-1">
                <v-slide-x-transition>
                  This appliction uses the browser's Local Storage to store data
                </v-slide-x-transition>
                <v-btn
                  class="pointer-events-initial text-none ml-5 custom-fab-close-text-info"
                  @click="showInfo = false"
                  icon="mdi-alpha-x"
                  size="x-small"
                />
              </span>
          </v-fab-transition>
        </div>
      </v-layout-item>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    data() {
      return {
        showInfo: false,
      }
    },
  }
</script>

<style>
.background-gradient {
  background: linear-gradient(#4f8f70, #0f312a)!important;
}

html { overflow-y: auto }

.custom-fab-close-text-info i {
  font-size: 32px;
}
</style>