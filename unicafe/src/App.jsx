import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Display = ({ text, quantity }) => {
  return (
    <p>{text} {quantity}</p>
  )
}

const App = () => {
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const handleGood    = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad     = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Display text="good" quantity={good} />
      <Display text="neutral" quantity={neutral} />
      <Display text="bad" quantity={bad} />
    </div>
  )
}

export default App