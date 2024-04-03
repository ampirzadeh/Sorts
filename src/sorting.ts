export type StepState = {
  nextStep: number[]
  effectedElementIndices: number[]
}

export type SortingGenerator = Generator<StepState, StepState>

export function* InsertionSort(arr: number[]): SortingGenerator {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j = j - 1
    }
    arr[j + 1] = key

    yield { nextStep: arr, effectedElementIndices: [i, j] }
  }

  return { nextStep: arr, effectedElementIndices: [] }
}

export function* BubbleSort(arr: number[]): SortingGenerator {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

    yield { nextStep: arr, effectedElementIndices: [i, arr.length - i] }
  }
  return { nextStep: arr, effectedElementIndices: [] }
}

export function* SelectionSort(arr: number[]): SortingGenerator {
  for (let i = 0; i < arr.length - 1; i++) {
    let min_idx = i
    for (let j = i + 1; j < arr.length; j++) if (arr[j] < arr[min_idx]) min_idx = j
    ;[arr[min_idx], arr[i]] = [arr[i], arr[min_idx]]
    yield { nextStep: arr, effectedElementIndices: [min_idx, i] }
  }

  return { nextStep: arr, effectedElementIndices: [] }
}

export function* Shuffle(arr: number[]): SortingGenerator {
  let currentIndex = arr.length,
    randomIndex

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    yield { nextStep: arr, effectedElementIndices: [randomIndex, currentIndex] }
  }

  return { nextStep: arr, effectedElementIndices: [currentIndex] }
}
