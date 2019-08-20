import React from "react";
import WaveSurfer from "wavesurfer.js";
//@ts-ignore
import Region from "../../node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions";

interface IAppState {
  waveSurfer?: WaveSurfer;
}

class App extends React.Component<any, IAppState> {
  componentDidMount() {
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      plugins: [Region.create()]
    });
    this.setState({
      waveSurfer: wavesurfer
    });
    wavesurfer.load(
      "http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
    );

    wavesurfer.on("region-click", function(Region, e) {
      e.stopPropagation();
      e.shiftKey ? Region.playLoop() : Region.play();
    });

    wavesurfer.on("region-dblclick", function(){
      Region.clear();
    })
  }

  play() {
    if (this.state.waveSurfer) {
      const { waveSurfer } = this.state;
      waveSurfer.play();
    }
  }

  stop() {
    if (this.state.waveSurfer) {
      const { waveSurfer } = this.state;
      waveSurfer.stop();
    }
  }

  addRegion() {
    if (this.state.waveSurfer) {
      const { waveSurfer } = this.state;
      waveSurfer.addRegion({
        start: 3,
        end: 10
      });
    }
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <div id="waveform" />
        <button onClick={() => this.play()}>Play</button>
        <button onClick={() => this.stop()}>Stop</button>
        <button onClick={() => this.addRegion()}>Add Region</button>
      </div>
    );
  }
}

export default App;
