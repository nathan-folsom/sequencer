import { useState } from 'react'
import './App.css'
import { STEPS_COUNT, Track } from "./steps";

const presets: Track[] = [
  {name: "Yell", stepsOn: []},
  {name: "Cough", stepsOn: []},
  {name: "Sneeze", stepsOn: []},
  {name: "Fart", stepsOn: []},
]

export default function App() {
  const [tracks, setTracks] = useState<Track[]>(presets);

  const handleUpdateTrack = (trackIndex: number, updatedTrack: Track) => {
    setTracks(previousTracks => {
      return previousTracks.map((track, i) => {
        if (i === trackIndex) {
          return updatedTrack;
        }
        return track;
      })
    })

  }

  return (
    <div className="App">
      {tracks.map((track, i) =>
        <TrackDisplay updateTrack={(nextTrack) => handleUpdateTrack(i, nextTrack)} track={track} />
      )}
    </div>
  )
}

function TrackDisplay({ track, updateTrack }: { track: Track; updateTrack: (nextTrack: Track) => void }) {
  const handleToggle = (index: number) => {
    const updatedTrack = { ...track };
    const updatedSteps = track.stepsOn.includes(index)
      ? track.stepsOn.filter(i => i !== index)
      : track.stepsOn.concat(index);

    updatedTrack.stepsOn = updatedSteps;

    updateTrack(updatedTrack)
  }

  return (
    <div key={track.name}>
      <h4>{track.name}</h4>
      <div className={"cell-container"}>
        {Array.from({ length: STEPS_COUNT }, (_, i) =>
          <Step key={i} on={track.stepsOn.includes(i)} toggleOn={() => handleToggle(i)} />)
        }
      </div>
    </div>
  )
}

function Step({ on, toggleOn }: { on: boolean; toggleOn: () => void }) {
  return <button onClick={toggleOn} className={`cell ${on ? "on" : "off"}`} />
}