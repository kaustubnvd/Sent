const User = require('../models/User');
const Trip = require('../models/Trip');
const Package = require('../models/Package');
const getFormattedDate = require('../util/date');


exports.getCarryDashboard = async (req, res, next) => {
  // Not logged in
  if (!req.session.user) {
    return res.redirect('/carrier-intro');
  }
  // TODO: Not be able to send request to oneself
  const currentTrip = await Trip.getCurrentTrip(req.session.user.id_user);
  console.log(currentTrip);
  const currentOffers = await Package.getAllOffers(currentTrip ? currentTrip.id_trip : null);
  const acceptedPackage = await Package.getPackageById(currentTrip ? currentTrip.id_package: null);
  const acceptedUser = acceptedPackage ? await User.getUserById(acceptedPackage.id_sender) : null;
  const prevTrips = await Trip.getPrevTrips(req.session.user.id_user);
  prevTrips.forEach(trip => {
    trip.date = getFormattedDate(trip.date);
  });
  console.log(prevTrips);
  res.render('carryDashboard', {
    currentTrip,
    formattedDate: currentTrip ? getFormattedDate(currentTrip.date) : null,
    currentOffers,
    acceptedPackage,
    acceptedUser,
    prevTrips,
  });
};

exports.acceptOffer = async (req, res, next) => {
  const {tripId, packageId} = req.body;
  // Change accepted enum
  await Trip.setAcceptedPackage(tripId, packageId);
  res.redirect('/carry-dashboard');
};

exports.declineOffer = async (req, res, next) => {
  const {packageId} = req.body;
  await Package.declinePackage(packageId);
  res.redirect('/carry-dashboard');
};

