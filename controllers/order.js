const User = require('../models/User');
const Trip = require('../models/Trip');
const Package = require('../models/Package');
const getFullName = require('../util/name');
const formatDate = require('../util/date');

exports.getOrderPage = async (req, res, next) => {
  const { tripId } = req.params;
  const {
    id_carrier,
    from_city: fromCity,
    to_city: toCity,
    price,
    date,
    size,
  } = await Trip.getTripById(tripId);
  const { first_name, last_name, img_url } = await User.getUserById(id_carrier);
  res.render('order', {
    carrierName: getFullName(first_name, last_name),
    carrierDesc: size,
    carrierPrice: '$' + price,
    profilePic: img_url,
    fromCity,
    toCity,
    leaveDate: formatDate(date),
    tripId,
  });
};

exports.makeOrder = async (req, res, next) => {
  const { packageTitle, packageDesc, packageNotes, tripId } = req.body;
  const isDuplicate = await Package.isDuplicate(tripId, req.session.user.id_user);
  const isIdiot= await Package.isIdiot(tripId, req.session.user.id_user);
  if (isDuplicate || isIdiot) {
    return res.redirect('/');
  }
  const imageURL = '/' + req.file.path;
  const package = new Package({
    tripId,
    packageTitle,
    packageDesc,
    deliveryNotes: packageNotes,
    imageURL,
    senderId: req.session.user.id_user,
  });
  await package.save();
  return res.redirect('/send-dashboard');
};
