const fs = require('fs');

exports.makeOrder = (req, res, next) => {
  fs.readFile('./order.json', 'utf8', (err, data) => {
    if (err) {
      return console.log('err');
    }
    const fileData = JSON.parse(data);
    fileData.order.push(req.body);
    fs.writeFile('./order.json', JSON.stringify(fileData), () => {
      console.log('received data');
    });
  });
  return res.redirect('/');
};
