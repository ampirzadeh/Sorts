<template>
  <div class="flex flex-col h-full">
    <div class="flex gap-3 m-6 glass absolute right-0 z-10 p-3">
      <form
        class="border-solid border-r border-gray-400 px-3"
        @submit.prevent="setup(lengthOfNumbersTMP)"
      >
        <input
          v-model="lengthOfNumbersTMP"
          type="number"
          class="border-solid border border-gray-300 rounded py-2 px-1"
        />
        <button
          :disabled="isManipulatingArray"
          class="
            px-4
            py-2
            text-white
            bg-red-500
            border-none
            rounded-md
            disabled:opacity-50
          "
          type="submit"
        >
          Generate
        </button>
      </form>

      <button
        :disabled="isManipulatingArray"
        class="
          px-4
          py-2
          text-white
          bg-red-500
          border-none
          rounded-md
          disabled:opacity-50
        "
        @click="shuffle"
      >
        <span>Shuffle! </span>
      </button>

      <button
        :disabled="isManipulatingArray"
        class="
          px-4
          py-2
          text-white
          bg-red-500
          border-none
          rounded-md
          disabled:opacity-50
        "
        @click="sort"
      >
        Sort
      </button>
    </div>

    <div
      class="
        flex flex-row flex-wrap-reverse
        h-full
        overflow-hidden
        fixed
        bottom-0
        right-0
        left-0
      "
    >
      <div
        v-for="num in arrayToBeSorted"
        :key="num"
        class="flex-1"
        :class="[
          BGs[random(0, Object.keys(BGs).length)],
          {
            'transition-all ease-linear duration-500': !initSetup,
          },
        ]"
        :style="{ height: `${(num / lengthOfNumbers) * 100}vh` }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class HomeScreen extends Vue {
  arrayToBeSorted: number[] = []
  lengthOfNumbers: number = 1000
  lengthOfNumbersTMP: number = 1000
  isManipulatingArray = false
  initSetup = false
  BGs: string[] = [
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-red-900',
  ]

  mounted() {
    this.setup()
  }

  setup(lengthOfNumbersTMP: number = 1000) {
    this.initSetup = true
    this.lengthOfNumbers = lengthOfNumbersTMP
    this.arrayToBeSorted = []
    for (let i = 0; i < this.lengthOfNumbers; i++) {
      this.arrayToBeSorted[i] = i
    }
    this.arrayToBeSorted.sort(() => Math.random() - 0.5)
    this.initSetup = false
  }

  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  sleep() {
    return new Promise((resolve) => setTimeout(resolve, this.delay))
  }

  replaceArrayElement(array: number[], index: number, value: number) {
    array.splice(index, 1, value)
  }

  async insertionSort(a: number[]) {
    let i
    const len = a.length
    let el
    let j

    for (i = 1; i < len; i++) {
      el = a[i]
      j = i

      while (j > 0 && a[j - 1] > el) {
        a[j] = a[j - 1]
        j--
      }

      this.replaceArrayElement(a, j, el)
      await this.sleep()
    }
  }

  arraySwap(array: number[], indexA: number, indexB: number) {
    const x = array[indexA]
    this.replaceArrayElement(array, indexA, array[indexB])
    this.replaceArrayElement(array, indexB, x)
  }

  async shuffleArray(a: number[]) {
    let j, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      this.arraySwap(a, i, j)
      await this.sleep()
    }
  }

  shuffle() {
    this.isManipulatingArray = true
    this.shuffleArray(this.arrayToBeSorted).then(
      () => (this.isManipulatingArray = false)
    )
  }

  sort() {
    this.isManipulatingArray = true
    this.insertionSort(this.arrayToBeSorted).then(
      () => (this.isManipulatingArray = false)
    )
  }

  get delay(): number {
    return this.lengthOfNumbers / this.lengthOfNumbers
  }
}
</script>

<style scoped>
.glass {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.32);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.7px);
  -webkit-backdrop-filter: blur(6.7px);
  border: 1px solid rgba(255, 255, 255, 0.19);
}
</style>
