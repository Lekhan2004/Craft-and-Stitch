import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'


function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1) // Increment the count
  }

  return (
    <>
      <div className='text-xl font-bold text-center '>
        Hi Welcome to C&S - The place where Producers and Consumers meet
        <div>Count: {count}</div>
        <Button  onClick={handleClick}>Click me</Button>
      </div>
    </>
  )
}

export default App