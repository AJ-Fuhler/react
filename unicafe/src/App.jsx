import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100

  return (
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={`${average.toFixed(2)}`} />
        <StatisticLine text="positive" value={`${positive.toFixed(1)} %`} />
        </tbody>
      </table>
    </div>
    )
}

const App = () => {
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const handleGood    = () => setGood(prev => prev + 1)
  const handleNeutral = () => setNeutral(prev => prev + 1)
  const handleBad     = () => setBad(prev => prev + 1)


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App