exports.getCarryDashboard = (req, res, next) => {
  res.render('carryDashboard', {
    carrierName: 'Suket Shah',
    fromCity: 'Flower Mound, TX',
    toCity: 'Austin, TX',
    tripDate: 'May 16, 2020',
    tripTime: '11:30 AM',
    tripSize: 'Fits in a trunk',
    tripPrice: '23',
    offerName: 'Anthony Davis',
    packageName: 'Chicken Biryani',
    phoneNum: '214-425-0447',
    email: 'suket.shah@yahoo.com',
    packageDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
    deliveryNotes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
    carryEmail: 'carrier.email@gmail.com',
    prevTrips: [
      {
        prevFrom: 'Flomo',
        prevTo: 'New York',
        prevDate: 'May 16, 2019',
        prevTime: '12:30 PM',
        prevSize: 'Fits in Trunk',
        prevPrice: '38',
        prevSender: 'Suket Shah',
      },
      {
        prevFrom: 'Austin',
        prevTo: 'Dallas',
        prevDate: 'May 16, 2019',
        prevTime: '12:30 PM',
        prevSize: 'Fits in Trunk',
        prevPrice: '38',
        prevSender: 'Suket Shah',
      },
    ],
  });
};
