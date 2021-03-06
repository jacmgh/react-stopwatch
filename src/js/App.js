import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import SplitTimes from './components/SplitTimes';

// Import styles
import './styles/main.css';
import './styles/btn.css';
import './styles/card.css';
import './styles/stopwatch.css';

// Helper function: convert timestamp (tenths of a second) to human readable format
const formatTime = n => {
    let minutes = Math.floor(n / 600);
    let seconds = Math.floor((n - minutes * 600) / 10);
    let milliseconds = Math.round(n - seconds * 10 - minutes * 600);
    return (
        <span>
            {minutes}:{seconds < 10 ? '0' + seconds : seconds}
            <span className="stopwatch__decimal">.{milliseconds}</span>
        </span>
    );
};

// Main component class
class App extends React.Component {

    constructor() {
        super();

        // Initial state
        this.state = {
            isRunning: false,
            time: 0,
            startTime: 0,
            splitTimes: []
        };

        // Bind methods
        this.handleStart = this.handleStart.bind(this);
        this.handleSplit = this.handleSplit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    // Start/Pause handler
    handleStart() {
        // Start handler
        if (!this.state.isRunning) {
            this.setState({
                isRunning: true,
                startTime: (new Date().getTime() - this.state.time)
            });
            this.intervalId = setInterval(this.updateTimer.bind(this), 100);
        } else { // Pause handler
            this.handleSplit();
            this.setState({
                isRunning: false,
                time: (new Date().getTime() - this.state.startTime)
            });
            clearInterval(this.intervalId);
        }
    }

    // Main timer interval function
    updateTimer() {
        this.setState({
            time: (new Date().getTime() - this.state.startTime)
        });
    }

    handleSplit() {
        if (this.state.isRunning) {
            let splitTimes = [new Date().getTime() - this.state.startTime].concat(this.state.splitTimes);
            this.setState({splitTimes});
        }
    }

    handleReset() {
        this.setState({isRunning: false, time: 0, startTime: 0, splitTimes: []});
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div>
                <div className="stopwatch card">

                    {/* Main timer */}
                    <div className="stopwatch__time">{formatTime(Math.round(this.state.time / 100))}</div>

                    {/* Buttons */}
                    <button type="button" className={'btn' + (this.state.isRunning ? ' btn--warning' : ' btn--success')} onClick={this.handleStart}>{this.state.isRunning ? 'Pause' : 'Start'}</button>
                    <button type="button" className="btn btn--success" onClick={this.handleSplit} disabled={!this.state.isRunning}>Split</button>
                    <button type="button" className="btn btn--danger" onClick={this.handleReset}>Reset</button>
                </div>

                {/* Split times */}
                <SplitTimes times={this.state.splitTimes}/>

            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app'));
