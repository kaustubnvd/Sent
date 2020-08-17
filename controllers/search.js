const parseAddress = require('parse-address-string');
const User = require('../models/User');
const Trip = require('../models/Trip');
const getFullName = require('../util/name');
const formatDate = require('../util/date');

exports.getSearch = (req, res, next) => {
  const { from, to, date } = req.query;
  parseAddress(from, (err, fromAddress) => {
    const { city: fromCity, postal_code: fromZip } = fromAddress;
    parseAddress(to, async (err, toAddress) => {
      const { city: toCity, postal_code: toZip } = toAddress;
      if ((fromCity || fromZip) && (toCity || toZip)) {
        const [rows] = await Trip.getTripsSearch({fromCity, fromZip, toCity, toZip, date});
        let carriers = rows.map(async ({ id_trip, id_carrier, price, date }) => {
          const user = await User.getUserById(id_carrier);
          const { first_name, last_name} = user;
          return {
            name: getFullName(first_name, last_name),
            date: formatDate(date),
            price,
            tripId: id_trip,
          };
        });
        carriers = await Promise.all(carriers);
        if (carriers.length > 0) {
          return res.render('search', {
            fromAddress: from,
            toAddress: to,
            carriers,
          });
        }
      }
      res.render('search', {
        fromAddress: from,
        toAddress: to,
        carriers: [],
      });
    });
  });
};
