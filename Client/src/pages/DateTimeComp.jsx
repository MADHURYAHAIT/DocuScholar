import React from 'react';

class DateTimeParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: props.timestamp,
      formattedDateTime: ''
    };
  }

  componentDidMount() {
    this.parseDateTime();
  }

  parseDateTime() {
    const { timestamp } = this.state;
    const dateTime = new Date(timestamp);
    const options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const formattedDateTime = dateTime.toLocaleString('en-US', options); // Format: Sunday, Mar 17, 7:49 PM (example)

    this.setState({
      formattedDateTime
    });
  }

  render() {
    const { formattedDateTime } = this.state;

    return (
      <div>
        <p>{formattedDateTime}</p>
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <div style={{color:'white'}}>
      <DateTimeParser timestamp={localStorage.getItem('created')} />
    </div>
  );
}

export default App;
