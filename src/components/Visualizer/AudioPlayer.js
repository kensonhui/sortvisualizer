import SoundFontPlayer from "soundfont-player";
import AudioContext from "./AudioContext";

const NullSoundFontPlayerNoteAudio = {
  stop() {}
};

const NullSoundFontPlayer = {
  play() {
    return NullSoundFontPlayerNoteAudio;
  }
};
const AudioPlayer = () => {
  //Audio Context
  const audioContext = AudioContext && new AudioContext();

  //soundPlayer
  let soundPlayer = NullSoundFontPlayer;
  //setInstrument
  const Player = {
    setInstrument(instrumentName) {
      SoundFontPlayer.instrument(audioContext, instrumentName)
        .then(soundfontPlayer => {
          soundPlayer = soundfontPlayer;
        })
        .catch(e => {
          soundPlayer = NullSoundFontPlayer;
        });
        console.log("Set instrument!");
    },
    playNote(note) {
      soundPlayer.play(note);
      console.log("Note played");
    }
  };
  return Player;
};

export default AudioPlayer;