// appointmentWorker.js
const { parentPort } = require('worker_threads');
const moment = require('moment');
const  Appointment  = require('./model/appointment'); // Adjust the path as necessary
//const { sendNotificationToUser } = require('./notifications'); // Adjust the path as necessary
const admin =require('firebase-admin');
const Notification = require('./model/notification');


const { Op } = require('sequelize');

async function fetchAndNotifyAppointments() {
  try {
    console.log("worker started")
    const currentDate = moment().format('YYYY-MM-DD');

    const appointments = await Appointment.findAll({
      where: {
        appointmentDate: {
          [Op.between]: [
            currentDate,
            moment(currentDate).add(3, 'days').format('YYYY-MM-DD'),
          ],
        },
      },
    });

    for (const appointment of appointments) {
      const UId = appointment.UId;
      const title = 'Reminder: Upcoming Appointment';
      const message = `You have an appointment scheduled for ${appointment.appointmentDate}. Please be on time.`;
      await sendNotificationToUser(UId, title, message);
    }
  } catch (error) {
    console.error('Error in fetching or notifying appointments:', error);
  }
}

// Listen for messages from the main thread
parentPort.on('message', (msg) => {
  if (msg === 'start') {
    fetchAndNotifyAppointments();
  }
});
async function sendNotificationToUser(UId, title, message) {
    try {
      const notification = await Notification.findOne({ where: { UId: UId } });
      if (!notification) {
        console.log('Notification not found');
        return;
      }
   
      const notificationMessage = {
        notification: { title, body: message },
        token: notification.token
      };
   
      const response = await admin.messaging().send(notificationMessage);
      console.log('Notification sent successfully:', response);
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  }