<template>
  <div
    id="app"
    class="h-screen text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- <header
      class="flex justify-between w-full px-4 py-2 align-middle bg-white shadow-md dark:bg-gray-800"
    >
      <h1 class="my-auto text-lg font-bold">All sort of sorts</h1>

      <button
        class="w-10 h-10 p-2 bg-gray-100 rounded-full shadow dark:bg-gray-900"
        :title="`Change theme to ${nextTheme}`"
        @click="switchTheme"
      >
        <svg-icon :name="$colorMode.preference" class="w-full h-full" />
      </button>
    </header> -->

    <main class="h-full mx-0">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Default extends Vue {
  get nextTheme() {
    switch (this.$colorMode.preference) {
      case 'system':
        return 'Light'
      case 'light':
        return 'Dark'
      case 'dark':
        return 'System'
      default:
        return 'System'
    }
  }

  switchTheme() {
    this.$colorMode.preference = this.nextTheme.toLocaleLowerCase()
  }
}
</script>
