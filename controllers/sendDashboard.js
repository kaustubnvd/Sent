const Trip = require('../models/Trip');
const Package = require('../models/Package');
const formatDate = require('../util/date');

exports.getSendDashboard = async (req, res, next) => {
  let sends = await Package.getAllSends(req.session.user.id_user);
  sends = sends.map(async (send) => {
    const tripData = await Trip.getSendData(send.id_trip);
    send.carrier = tripData;
    send.carrier.date = formatDate(send.carrier.date);
    return send;
  });
  sends = await Promise.all(sends);
  res.render('sendDashboard', {
    currentSends: sends,
  });
};
