const User = require('../models/User');
const Trip = require('../models/Trip');
const Package = require('../models/Package');
const getFullName = require('../util/name');
const formatDate = require('../util/date');

exports.getOrderPage = async (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  }
  const { tripId } = req.params;
  const {
    id_carrier,
    from_city: fromCity,
    to_city: toCity,
    price,
    date,
    size,
  } = await Trip.getTripById(tripId);
  const { first_name, last_name } = await User.getUserById(id_carrier);
  res.render('order', {
    user: 'Avi',
    carrierName: getFullName(first_name, last_name),
    carrierDesc: size,
    carrierPrice: '$' + price,
    fromCity,
    toCity,
    leaveDate: formatDate(date),
    tripId,
  });
};

exports.makeOrder = async (req, res, next) => {
  const { packageTitle, packageDesc, packageNotes, tripId } = req.body;
  const package = new Package({
    tripId,
    packageTitle,
    packageDesc,
    deliveryNotes: packageNotes,
    imageURL:
      'https://images.unsplash.com/photo-1551825687-f9de1603ed8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    senderId: '23',
  });
  await package.save();
  return res.redirect('/');
};
