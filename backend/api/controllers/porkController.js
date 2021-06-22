const mongoose = require('mongoose');
const time = require('time-since');

const { Insert } = require('../../sqltest');

exports.home = function(req, res) {
  var epoch = new Date('June 12, 2021 10:00:00 PDT');
  const totalSeconds = time.since(epoch).secs();
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const timeSince = `${hours}:${minutes}:${seconds}`
  res.json({
    'message': typeof(timeSince)
  })
}

exports.create_a_pork = function(req, res) {
  var epoch = new Date('June 13, 2021 10:00:00 PDT');
  let totalSeconds = time.since(epoch).secs();
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  const timeSince = `${hours}:${minutes}:${seconds}`

  const sentiment = req.body.sentimentScore;
  const systemTime = req.body.systemTime;
  const pid = req.body.participantId;
  const mediaTime = req.body.mediaTime;
  const startTime = req.body.startTime;

  res.send(Insert(pid, sentiment, mediaTime, systemTime, startTime, timeSince))
}