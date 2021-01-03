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
let key = 21;
let notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

//soundPlayer
let soundPlayer = NullSoundFontPlayer;

function roundUp(numToRound) {
    var closest;
    var min = 12;
    var hold;
    for (let i = 0; i < notes.length; i++) {
        hold = (numToRound - notes[i] - key) % 12;
        if (hold === 0) {
            return numToRound;
        } else if (hold < min && hold > 0) {
            min = hold;
            closest = Math.floor((numToRound - key) / 12) * 12 + key + notes[i];
        }
    }
    return closest;
}

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
        if (typeof(note) === "number") {
            soundPlayer.play(roundUp(note));
        } else {
            soundPlayer.play(note);
        }
    },
    setKey(newKey, newNotes) {
        notes = newNotes;
        key = newKey;
    } 
};
return Player;
};

export default AudioPlayer;