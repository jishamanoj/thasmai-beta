const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const session = require('express-session');

app.use(cors());

app.use(express.json())
const sessionMiddleware = session({
    secret: '8be00e304a7ab94f27b5e5172cc0f3b2c575e87d',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    },
  });
 
  app.use(sessionMiddleware);
app.use('/api/v1', require('./router/routing')); // Corrected the router path

const { Worker } = require('worker_threads');

function startAppointmentWorker() {
  const worker = new Worker('./worker.js'); // Adjust the path as necessary

  worker.on('error', (error) => {
    console.error('Worker error:', error);
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });

  // Send a message to start fetching and notifying appointments
  worker.postMessage('start');

  return worker;
}

// Start the worker immediately
let appointmentWorker = startAppointmentWorker();

// Set an interval to restart the worker every hour (3600000 ms)
setInterval(() => {
  console.log('Restarting appointment worker...');
  appointmentWorker.terminate(); // Terminate the old worker
  appointmentWorker = startAppointmentWorker(); // Start a new worker
}, 10000);

const httpServer = http.createServer(app)



const io = new Server(httpServer,{cors:{origin: "*"}})



module.exports = app