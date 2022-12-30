class DrumPad extends React.Component {
  render() {
    return (
      <div className="col">
        <button
          className="drum-pad btn btn-primary w-100"
          id={this.props.soundFile}
          onClick={this.props.onClick}
        >
          {this.props.label}
          <audio
            id={this.props.label}
            className="clip"
            src={`assets/sounds/Cassette808_${this.props.soundFile}.wav`}
          ></audio>
        </button>
      </div>
    );
  }
}

class PadBank extends React.Component {
  render() {
    const padsData = this.props.padsData;
    const pads = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const padRow = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const padIndex = rowIndex * 3 + colIndex;
        const { label, soundFile } = padsData[padIndex];
        padRow.push(
          <DrumPad
            key={label}
            label={label}
            soundFile={soundFile}
            onClick={() => this.props.onClick(label)}
          />
        );
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
  padsData = [
    {
      label: "Q",
      soundFile: "Tom01",
    },
    {
      label: "W",
      soundFile: "Tom02",
    },
    {
      label: "E",
      soundFile: "Tom03",
    },
    {
      label: "A",
      soundFile: "HH_01",
    },
    {
      label: "S",
      soundFile: "HHo_01",
    },
    {
      label: "D",
      soundFile: "Cym01",
    },
    {
      label: "Z",
      soundFile: "BD01",
    },
    {
      label: "X",
      soundFile: "Cow01",
    },
    {
      label: "C",
      soundFile: "Snr01",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      currentSound: ''
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup);
  }

  handleClick = (padLabel) => {
    const labels = this.padsData.map((padData) => padData.label);
    if (labels.includes(padLabel)) {
      document.querySelector(`#${padLabel}`).play();
      const padData = this.padsData.find(
        (padData) => padData.label === padLabel
      );
      this.setState({ currentSound: padData.soundFile });
    }
  };

  handleKeydown = (event) => {
    const padLabel = event.key.toUpperCase();
    const labels = this.padsData.map((padData) => padData.label);
    if (labels.includes(padLabel)) {
      this.handleClick(padLabel);
      const padData = this.padsData.find(
        (padData) => padData.label === padLabel
      );
      document.querySelector(`#${padData.soundFile}`).classList.add("active");
    }
  };

  handleKeyup = (event) => {
    const padLabel = event.key.toUpperCase();
    const labels = this.padsData.map((padData) => padData.label);
    if (labels.includes(padLabel)) {
      const padData = this.padsData.find(
        (padData) => padData.label === padLabel
      );
      document
        .querySelector(`#${padData.soundFile}`)
        .classList.remove("active");
    }
  };

  render() {
    return (
      <div id="drum-machine" className="container my-3">
        <div className="row">
          <div className="col">
            <h1>RMX-666 Drum Machine</h1>
          </div>
        </div>
        <div className="row">
          <PadBank
            padsData={this.padsData}
            onClick={(label) => this.handleClick(label)}
          />
          <Controls value={this.state.currentSound} />
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<DrumMachine />);
