import axios from 'axios'

import { ADD_SENTIMENT } from './types';

export const setSentimentNumber = (number, user, time, mediaTime, startTime, videoUrl) => {
  return dispatch => {
    axios.post(`https://turnip3-api.azurewebsites.net/turnip`,
      {
        sentimentScore: number,
        systemTime: time,
        participantId: user,
        mediaTime: mediaTime,
        startTime: startTime,
        videoUrl: videoUrl
      })
      .then(res => {
        dispatch(addSentiment(res.data))
      })
      .catch(err => {
        console.log("Error @sentimentAction: ", err);
      })
  }
}

const addSentiment = sentiment => ({
  type: ADD_SENTIMENT,
  payload: {
    sentimentScore: sentiment.sentimentScore,
    systemTime: sentiment.systemTime,
    number: sentiment.number,
    mediaTime: sentiment.mediaTime,
    startTime: sentiment.startTime,
    videoUrl: sentiment.videoUrl
  }
})