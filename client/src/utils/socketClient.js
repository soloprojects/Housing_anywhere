import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:9000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function subscribeToDroneUpdate(cb) {
  socket.on('droneUpdated', drone => cb(null, drone));
}

function subscribeToDroneQuadrantUpdated(cb) {
  socket.on('droneQuadrantUpdated', drone => cb(null, drone));
}

export { subscribeToTimer, subscribeToDroneUpdate, subscribeToDroneQuadrantUpdated };
