import React from 'react';

// Import styles
import '../styles/split-times.css';
import '../styles/card.css';

// Helper function: convert milliseconds to human readable format
const formatTime = n => {
    let minutes = Math.floor(n / 60000);
    let seconds = Math.floor((n - minutes * 60000) / 1000);
    let milliseconds = Math.round(n - seconds * 1000 - minutes * 60000);
    milliseconds = milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds;
    return (
        <span>
            {minutes}:{seconds < 10 ? '0' + seconds : seconds}
            <span className="stopwatch__decimal">.{milliseconds}</span>
        </span>
    );
};

// Component class
class SplitTimes extends React.Component {
    render() {
        let times = this.props.times.map((time, index) => <li className="split-times__item card" key={index}>{formatTime(time)}</li>);
        return (
            <ul className="split-times">
                {times}
            </ul>
        );
    }
}

export default SplitTimes;
