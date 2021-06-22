import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setParticipantId } from "../../actions/participantActions";

import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pid, setPid] = useState("");
  const [error, setError] = useState("");
  const [countDown, setCountDown] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const search = useLocation().search;
  const testing = new URLSearchParams(search).get('testing');

  const checkPID = (pid) => {
    const myRe = /^PID\d{5}$/;
    if (pid === "") {
      setError("You need to enter a participant ID");
    } else if (myRe.test(pid) === false) {
      setError("You must enter a valid PID");
    } else {
      dispatch(setParticipantId(pid));
      history.push("/turnip");
    }
  };

  useEffect(() => {
    const startTime = new Date('June 13, 2021 09:55:00 PDT');
    const utcStartTime = startTime.toUTCString();

    const checkTime = setInterval(() => {
      const currentTime = new Date();
      const utcCurrentTime = currentTime.toUTCString();
      const valid = utcStartTime <= utcCurrentTime;

      const distance = Date.parse(utcStartTime) - Date.parse(utcCurrentTime);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const display = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setCountDown(display);

      if(testing) {
        setIsDisabled(false);
      }
      
      if(valid) {
        setIsDisabled(false);
      }
    }, 1000);
    return () => clearInterval(checkTime);
  },[testing])

  return (
    <div className="main">
      <div className="login-container">
        <div className="login-box">
          <h1 className="title">
            Welcome to the dial testing portion of the study!
          </h1>
          <div className="input-container">
            <p style={{ color: "black" }}>Please enter your Participant ID:</p>
            <form>
              <input
                autoFocus
                type="text"
                placeholder="PID12345"
                onChange={(e) => setPid(e.target.value)}
                value={pid}
                className="pid-input"
              />

              {error ? (
                <p style={{ color: "red", marginBottom: 5 }}>{error}</p>
              ) : null}

              <button onClick={() => checkPID(pid)} className="submit-button" disabled={isDisabled}>
                { isDisabled ?  "Session starts in: " + countDown  : "Enter" }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
