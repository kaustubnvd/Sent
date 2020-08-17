const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
var parseAddress = require('parse-address-string');

module.exports = class Trip {
  constructor({ carrierId, from, to, size, date, price }) {
    this.id = uuidv4();
    this.carrierId = carrierId;
    this.from = from;
    this.to = to;
    this.size = size;
    this.date = date;
    this.price = price;
  }
  async save() {
    try {
      parseAddress(this.from, async (err, fromAddress) => {
        const {
          city: fromCity,
          state: fromState,
          postal_code: fromZip,
        } = fromAddress;
        parseAddress(this.to, async (err, toAddress) => {
          const {
            city: toCity,
            state: toState,
            postal_code: toZip,
          } = toAddress;
          await db.execute(
            'INSERT INTO trips(id_trip, id_carrier, from_city, from_zip, from_state, to_city, to_zip, to_state, size, date, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              this.id,
              this.carrierId,
              fromCity,
              fromZip,
              fromState,
              toCity,
              toZip,
              toState,
              this.size,
              this.date,
              this.price,
            ]
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  static getTripsSearch({fromCity, fromZip, toCity, toZip, date}) {
    return db.execute(
      'SELECT * FROM trips WHERE (from_city = ? OR from_zip = ?) AND (to_city = ? OR to_zip = ?) AND (date > ?)',
      [fromCity, fromZip, toCity, toZip, date]
    );
  }
  static async getTripById(id) {
    const [rows] = await db.execute('SELECT * FROM trips WHERE id_trip = ?', [id]);
    return rows[0];
  }
};
