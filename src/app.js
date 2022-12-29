class DrumPad extends React.Component {
  render() {
    return (
      <div className='drum-pad'>
        {this.props.value}
      </div>
    );
  }
}

class PadBank extends React.Component {
  render() {
    const pads = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const padRow = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const padIndex = rowIndex * 3 + colIndex;
        padRow.push(
          <DrumPad
            key={padIndex}
            value={padIndex}
          />
        );
      }
      pads.push(
        <div className='pad-row' key={rowIndex}>
          {padRow}
        </div>
      );
    }

    return (
      <div id='pad-bank'>
        {pads}
      </div>
    );
  }
}

class Controls extends React.Component {
  render() {
    return (
      <div id='display'>
        {this.props.value}
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  render() {
    const currentSound = 'Sound X';
    return (
      <div id='drum-machine'>
        <PadBank />
        <Controls value={currentSound} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<DrumMachine />);