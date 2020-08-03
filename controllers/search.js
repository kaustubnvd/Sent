exports.getSearch = (req, res, next) => {
  const { from, to, date } = req.query;
  let carriers = [];
  if (from === 'Flower Mound, TX, USA' && to === 'Austin, TX, USA') {
    carriers = getFromDatabase();
  }
  res.render('search', {
    fromAddress: from,
    toAddress: to,
    date: date,
    carriers,
  });
};

function getFromDatabase() {
  return [
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
    { name: 'Alex A.', from: 'Flower Mound, TX', to: 'Austin, TX', price: 21 },
  ];
}
