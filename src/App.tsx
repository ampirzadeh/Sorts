import React from 'react'

function App() {
  return (
    <h1
      className={`${
        process.env.NODE_ENV === 'development' ? 'debug-screens' : ''
      } text-3xl font-bold underline`}
    >
      Hello world!
    </h1>
  )
}

export default App
