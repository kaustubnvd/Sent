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
    }
  }
  static getTripsSearch({ fromCity, fromZip, toCity, toZip, date }) {
    return db.execute(
      'SELECT * FROM trips WHERE (from_city = ? OR from_zip = ?) AND (to_city = ? OR to_zip = ?) AND (date >= ?) AND id_package IS NULL',
      [fromCity, fromZip, toCity, toZip, date]
    );
  }
  static async getTripById(id) {
    const [rows] = await db.execute('SELECT * FROM trips WHERE id_trip = ?', [
      id,
    ]);
    return rows[0];
  }

  static async getCurrentTrip(userId) {
    const [
      rows,
    ] = await db.execute(
      'SELECT * FROM trips WHERE id_carrier = ? AND date >= ?',
      [userId, new Date().toISOString().split('T')[0]]
    );
    return rows[0];
  }

  static async getPrevTrips(userId) {
    const [
      prevTrips,
    ] = await db.execute(
      'SELECT trips.from_city, trips.to_city, trips.date, trips.price, users.first_name, users.last_name FROM trips JOIN users ON trips.id_sender = users.id_user WHERE trips.id_carrier = ? AND trips.date < ?',
      [userId, new Date().toISOString().split('T')[0]]
    );
    return prevTrips;
  }

  static async setAcceptedPackage(tripId, packageId) {
    const [
      senders,
    ] = await db.execute(
      'SELECT id_sender FROM packages WHERE id_package = ?',
      [packageId]
    );
    const senderId = senders[0].id_sender;
    await db.execute(
      'UPDATE trips SET id_package = ?, id_sender = ? WHERE id_trip = ?',
      [packageId, senderId, tripId]
    );
    // Accept package
    await db.execute('UPDATE packages SET status = 2 WHERE id_package = ?', [packageId]);
    // Decline all other packages
    await db.execute('UPDATE packages SET status = 3 WHERE id_trip = ? AND id_package <> ?', [tripId, packageId]);
  }
  // Sender queries
  static async getSendData(tripId) {
    const [trips] = await db.execute('SELECT id_carrier FROM trips WHERE id_trip = ?', [tripId]);
    const carrierId = trips[0].id_carrier;
    const [rows] = await db.execute(
      'SELECT trips.from_city, trips.to_city, trips.date, trips.price, users.first_name, users.last_name, users.email, users.phone_num FROM trips JOIN users ON trips.id_carrier = users.id_user WHERE users.id_user = ?', [carrierId]
    );
    return rows[0];
  }
};
