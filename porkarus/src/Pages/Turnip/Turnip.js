import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ReactPlayer from "react-player";
import "./styles.css";
import { setSentimentNumber } from "../../actions/sentimentActions";

function Turnip() {
  const time = useSelector((state) => state.systemTime);
  const user = useSelector((state) => state.participantId);
  const [mediaTime, setMediaTime] = useState();
  const [startTime, setStartTime] = useState();
  const [sentimentScore, setSentimentScore] = useState(50);
  const [idleTime, setIdleTime] = useState(0);
  const dispatch = useDispatch(); 

  let totalSeconds = mediaTime;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  // Convert the time to pretty stuff
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  const formattedTime = hours + ":" + minutes + ":" + seconds;

  useEffect(() => {
    const idleTimer = setInterval(() => {
      setIdleTime((idleTime) => idleTime + 1);
    }, 1000);
    return () => clearInterval(idleTimer);
  }, [idleTime]);

  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
      return "Show Warning";
    }

    document.addEventListener("keydown", (e) => {
      console.log(`Key: ${e.key} -- KeyCode: ${e.keyCode}`);
      if (e.keyCode === 9 || e.keyCode === 33 || e.keyCode === 34) {
        e.preventDefault();
      }
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        setSentimentNumber(sentimentScore, user, time, formattedTime, startTime)
      );
    }, 800);

    return () => clearInterval(interval);
  }, [dispatch, user, time, mediaTime, formattedTime, startTime]);

  const sentimentScoreSetting = (e) => {
    e.preventDefault();
    setSentimentScore(parseInt(e.target.value));
    setIdleTime(0);
  };

  const createTicks = () => {
    let ticks = [];

    for (let i = 0; i < 101; i += 10) {
      ticks.push(
        <span key={i} className="tick">
          {i}
        </span>
      );
    }
    return ticks;
  };

  // Twitch backup
  // https://www.twitch.tv/1z2x3c4f
  return (
    <div className="container">
      <div className="video-container">
        <div id="overlay"></div>
        <ReactPlayer
          url="https://youtu.be/mYAIHWGB-Xo"
          volume={1}
          muted={false}
          controls={false}
          width="100%"
          height="100%"
          playing={true}
          onReady={(e) => setStartTime(Date())}
          onProgress={(e) => {
            setMediaTime(e.playedSeconds)
          }}
        />
      </div>
      {idleTime > 20 && idleTime < 120 ? (
        <h1 className="warning pulsate">
          Is your interest rating still {sentimentScore}?
        </h1>
      ) : idleTime >= 120 ? (
        <h1 className="warning pulsate">
          You haven't been active for over 2 minutes. Is your interest rating
          still {sentimentScore}?{" "}
        </h1>
      ) : (
        <h1 style={{ paddingTop: "15px", paddingBottom: "15px" }}>
          How interested are you? {sentimentScore}
        </h1>
      )}

      <div className="sentiment-container">
        <div className="smile-container">
          <i className="far fa-frown fa-3x"></i>
          <p style={{ textAlign: "center" }}>Not Interested</p>
        </div>
        <div className="slider-container">
          <input
            className="slider"
            type="range"
            min="0"
            max="100"
            step="1"
            value={sentimentScore}
            onChange={sentimentScoreSetting}
            list="steplist"
            autoFocus
          />
          <div className="ticks">{createTicks()}</div>
        </div>
        <div className="smile-container">
          <i className="far fa-smile fa-3x"></i>
          <p style={{ textAlign: "center" }}>Very Interested</p>
        </div>
      </div>
    </div>
  );
}

export default Turnip;
