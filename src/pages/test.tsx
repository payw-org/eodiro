import { Button, LineInput } from '@/components/ui'
import React, { createContext, useContext, useState } from 'react'

import { Dispatcher } from '@/types/react-helper'
import { NextPage } from 'next'

const CountStateContext = createContext<number>(undefined)
const CountDispatchContext = createContext<Dispatcher<number>>(undefined)
const CountContextProvider = ({ children }) => {
  const [count, setCount] = useState(0)

  return (
    <CountDispatchContext.Provider value={setCount}>
      <CountStateContext.Provider value={count}>
        {children}
      </CountStateContext.Provider>
    </CountDispatchContext.Provider>
  )
}

const Count = () => {
  const count = useContext(CountStateContext)

  return <p>{count}</p>
}

const B = () => {
  const setCount = useContext(CountDispatchContext)

  return (
    <Button
      label="Button"
      onClick={() => {
        setCount((prevCount) => {
          return prevCount + 1
        })
      }}
    />
  )
}

const TestPage: NextPage = () => {
  return (
    <>
      <h1>Heading 1 Heading 1 Heading 1 Heading 1 Heading 1</h1>
      <h2>Heading 2 Heading 2 Heading 2 Heading 2 Heading 2</h2>
      <h3>Heading 3 Heading 3 Heading 3 Heading 3 Heading 3</h3>
      <p>Body Body Body Body Body</p>
      <LineInput />
      <CountContextProvider>
        <Count />
        <B />
      </CountContextProvider>
    </>
  )
}

export default TestPage
