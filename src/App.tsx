import React, { useEffect, useState } from 'react'
import {
  BubbleSort,
  InsertionSort,
  SelectionSort,
  Shuffle,
  SortingGenerator,
} from './sorting'

function App() {
  const [arrayToSort, setArrayToSort] = useState<number[]>([])
  const [arrSize, setArrSize] = useState(200)
  const [effectedElementIdx, setEffectedElementIdx] = useState<number[]>([])
  const [isSorting, setIsSorting] = useState(false)

  useEffect(() => {
    setArrayToSort(
      Array.from({ length: arrSize }, (_, i) => i).sort(() => Math.random() - 0.5)
    )
  }, [arrSize])

  const initSort = async (generator: SortingGenerator) => {
    setIsSorting(true)
    sort(generator)
  }

  const sort = (generator: SortingGenerator) => {
    const nextStep = generator.next()
    if (!nextStep.done) {
      setArrayToSort([...nextStep.value.nextStep])
      setEffectedElementIdx([...nextStep.value.effectedElementIndices])
      setTimeout(() => {
        sort(generator)
      }, arrSize / 20)
    } else {
      setIsSorting(false)
    }
  }

  return (
    <div
      className={`flex flex-col h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200 ${
        process.env.NODE_ENV === 'development' ? 'debug-screens' : ''
      }`}
    >
      <nav className="flex gap-3 glass top-0 right-0 z-10 p-3 flex-wrap">
        <form className="border-solid border-r border-gray-400 px-3">
          <input
            disabled={isSorting}
            value={arrSize}
            onChange={(e) => setArrSize(+e.target.value)}
            type="number"
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </form>

        <button
          disabled={isSorting}
          className="px-4 py-2 text-white bg-red-500 border-none rounded-md disabled:opacity-50"
          onClick={() => initSort(Shuffle(arrayToSort))}
        >
          Shuffle
        </button>

        <button
          disabled={isSorting}
          className="px-4 py-2 text-white bg-red-500 border-none rounded-md disabled:opacity-50"
          onClick={() => initSort(InsertionSort(arrayToSort))}
        >
          Insertion Sort
        </button>

        <button
          disabled={isSorting}
          className="px-4 py-2 text-white bg-red-500 border-none rounded-md disabled:opacity-50"
          onClick={() => initSort(BubbleSort(arrayToSort))}
        >
          Bubble Sort
        </button>

        <button
          disabled={isSorting}
          className="px-4 py-2 text-white bg-red-500 border-none rounded-md disabled:opacity-50"
          onClick={() => initSort(SelectionSort(arrayToSort))}
        >
          Selection Sort
        </button>
      </nav>

      <div className="flex flex-row flex-wrap-reverse h-5/6 overflow-hidden fixed bottom-0 right-0 left-0">
        {arrayToSort.map((num, i) => (
          <div
            key={num}
            className={`flex-1`}
            style={{
              height: `${(num / arrSize) * 100}%`,
              backgroundColor:
                effectedElementIdx.indexOf(i) === -1
                  ? `hsl(0, 100%, ${((num * 0.8) / arrSize) * 100}%)`
                  : `blue`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
