import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => (
    <h1>{title}</h1>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Feedback = ({ incrementCount }) => (
    <div>
        <Header title='anna palautetta' />
        <Button handleClick={incrementCount('good')} text='hyvä' />
        <Button handleClick={incrementCount('neutral')} text='neutraali' />
        <Button handleClick={incrementCount('bad')} text='huono' />
    </div>
)

const Statistic = ({ name, value }) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const n = good + neutral + bad

    if (n === 0) {
        return (
            <div>
                <Header title='statistiikka' />
                ei yhtään palautetta annettu
            </div>
        )
    }

    const mean = () => {
        return (good - bad) / n
    }

    const positive = () => {
        return good / n
    }

    const meanStr = mean().toFixed(1)
    const posStr = (positive() * 100).toFixed(1) + ' %'

    return (
        <div>
            <Header title='statistiikka' />
            <table>
                <tbody>
                    <Statistic name='hyvä' value={good} />
                    <Statistic name='neutraali' value={neutral} />
                    <Statistic name='huono' value={bad} />
                    <Statistic name='keskiarvo' value={meanStr} />
                    <Statistic name='positiivisia' value={posStr} />
                </tbody>
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    incrementCount = (name) => () => {
        this.setState({ [name]: this.state[name] + 1 })
    }

    render() {
        return (
            <div>
                <Feedback incrementCount={this.incrementCount} />
                <Statistics good={this.state.good}
                            neutral={this.state.neutral}
                            bad={this.state.bad} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
