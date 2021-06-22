import { ADD_SENTIMENT } from "../actions/types";

const initialState = {
  participantId: "",
  intervalTime: null,
  sentimentScore: 50,
  systemTime: null,
  mediaTime: "",
  startTime: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PID":
      return {
        ...state,
        participantId: action.payload,
      };
    case ADD_SENTIMENT:
      let d = new Date();
      let n = d.toISOString().slice(0, 19).replace("T", " ");
      return {
        ...state,
        intervalTime: n,
        sentimentScore: action.payload.sentimentScore,
        systemTime: n,
        mediaTime: action.payload.mediaTime,
        startTime: action.payload.startTime,
      };
    default:
      return state;
  }
}

export default rootReducer;
