exports.getOrderPage = (req, res, next) => {
  res.render('order', {
    carrierName: 'Suket Shah',
    carrierDesc: 'Anything that fits in a trunk',
    carrierPrice: '$21',
    fromCity: 'Austin, TX',
    toCity: 'Flower Mound, TX',
    leaveTime: '4:43pm',
    leaveDate: '10/23/20',
  });
};
