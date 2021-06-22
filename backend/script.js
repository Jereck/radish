import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 120,
  duration: '120m'
}

export default function () {
  var url = 'https://turnip3-api.azurewebsites.net/turnip'
  var payload = JSON.stringify({
    sentimentScore: 10,
    systemTime: '2021-05-15T17:12:58.196Z',
    participantId: 'PID005',
    mediaTime: '9976:05:36',
    startTime: 'Sat May 15 2021 13:12:30 GMT-0400 (Eastern Daylight Time)'
  })
  var params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  http.post(url, payload, params);
  sleep(1);
}