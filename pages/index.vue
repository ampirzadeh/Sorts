<template>
  <div class="flex flex-col h-full">
    <div class="flex gap-10 m-6">
      <button
        :disabled="isManipulatingArray"
        class="px-4 py-2 text-white bg-red-500 border-none rounded-md disabled:opacity-50"
        @click="shuffle"
      >
        <span>Shuffle! </span>
      </button>

      <button
        :disabled="isManipulatingArray"
        class="px-4 py-2 text-white bg-red-500 border-none rounded-md disabled:opacity-50"
        @click="sort"
      >
        sort
      </button>
    </div>

    <transition-group
      tag="div"
      class="flex flex-row flex-wrap-reverse h-full overflow-hidden"
    >
      <div
        v-for="num in arrayToBeSorted"
        :key="num"
        :class="BGs[random(0, Object.keys(BGs).length)]"
        class="flex-1 list-animation-item"
        :style="{ height: `${num / 2}px` }"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class HomeScreen extends Vue {
  arrayToBeSorted: number[] = []
  lengthOfNumbers: number = 1000
  delay: number = 100
  isManipulatingArray = false
  BGs: string[] = [
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-red-900',
  ]

  mounted() {
    for (let i = 0; i < this.lengthOfNumbers; i++) {
      this.arrayToBeSorted[i] = i
    }
    this.arrayToBeSorted.sort(() => Math.random() - 0.5)
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
}
</script>

<style scoped lang="postcss">
.list-animation-item {
  @apply transition-all ease-linear duration-500;
}
</style>
