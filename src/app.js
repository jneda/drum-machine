class DrumPad extends React.Component {
  render() {
    return <div className="drum-pad col">
      <button className='btn btn-primary w-100'>{this.props.value}</button>
    </div>;
  }
}

class PadBank extends React.Component {
  render() {
    const pads = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const padRow = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const padIndex = rowIndex * 3 + colIndex;
        padRow.push(<DrumPad key={padIndex} value={padIndex} />);
      }
      pads.push(
        <div className="pad-row row g-1 my-1" key={rowIndex}>
          {padRow}
        </div>
      );
    }

    return (
      <div id="pad-bank" className="col">
        {pads}
      </div>
    );
  }
}

class Controls extends React.Component {
  render() {
    return (
      <div id="display" className="col">
        {this.props.value}
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  render() {
    const currentSound = "Sound X";
    return (
      <div id="drum-machine" className="container">
        <div className='row'>
          <PadBank />
          <Controls value={currentSound} />
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<DrumMachine />);
