//import io from 'socket.io-client';

const io = require("socket.io-client");

var socket = io.connect('wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {path: '/trucks'});

export default socket;