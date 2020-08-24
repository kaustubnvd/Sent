const User = require('../models/User');
const Trip = require('../models/Trip');
const Package = require('../models/Package');
const getFormattedDate = require('../util/date');
const mailer = require('../config/mail');

exports.getCarryDashboard = async (req, res, next) => {
  // Not logged in
  if (!req.session.user) {
    return res.redirect('/carrier-intro');
  }
  const currentTrip = await Trip.getCurrentTrip(req.session.user.id_user);
  const currentOffers = await Package.getAllOffers(
    currentTrip ? currentTrip.id_trip : null
  );
  const acceptedPackage = await Package.getPackageById(
    currentTrip ? currentTrip.id_package : null
  );
  const acceptedUser = acceptedPackage
    ? await User.getUserById(acceptedPackage.id_sender)
    : null;
  const prevTrips = await Trip.getPrevTrips(req.session.user.id_user);
  prevTrips.forEach((trip) => {
    trip.date = getFormattedDate(trip.date);
  });
  res.render('carryDashboard', {
    currentTrip,
    formattedDate: currentTrip ? getFormattedDate(currentTrip.date) : null,
    currentOffers,
    acceptedPackage,
    acceptedUser,
    prevTrips,
    modal: req.flash('modal'),
  });
};

exports.acceptOffer = async (req, res, next) => {
  try {
    const { tripId, packageId } = req.body;
    await Trip.setAcceptedPackage(tripId, packageId);
    const sender = await Package.getSenderByPackage(packageId);
    const carrier = req.session.user;
    const carrierName = carrier.first_name + ' ' + carrier.last_name;
    req.flash('modal', 'Congratulations!');
    await mailer.sendMail({
      from: '"Sent 📦" <contactsentteam@gmail.com>', // sender address
      to: sender.email, // list of receivers
      subject: `Congratulations - Request Accepted By ${carrierName}`, // Subject line
      html: `<b>Congratulations!</b><br><br>
              Your request has been accepted by ${carrierName}. You can contact them at either ${carrier.email}
              or ${carrier.phone_num}. 
            `,
    });
    res.redirect('/carry-dashboard');
  } catch (err) {
    return next(err);
  }
};

exports.declineOffer = async (req, res, next) => {
  const { packageId } = req.body;
  await Package.declinePackage(packageId);
  res.redirect('/carry-dashboard');
};
