export const setParticipantId = (pid) => {
  localStorage.setItem('pid', pid);
  return {
    type: 'GET_PID',
    payload: pid
  }
}