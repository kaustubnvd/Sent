const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

module.exports = class Package {
  constructor({
    tripId,
    packageTitle,
    packageDesc,
    deliveryNotes,
    imageURL,
    senderId,
  }) {
    this.id = uuidv4();
    this.tripId = tripId;
    this.senderId = senderId;
    this.packageTitle = packageTitle;
    this.packageDesc = packageDesc;
    this.deliveryNotes = deliveryNotes;
    this.imageURL = imageURL;
  }
  async save() {
    try {
      await db.execute(
        'INSERT INTO packages(id_package, package_title, package_desc, delivery_note, img_url, id_sender, id_trip) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.packageTitle,
          this.packageDesc,
          this.deliveryNotes,
          this.imageURL,
          this.senderId,
          this.tripId,
        ]
      );
    } catch (err) {
      console.log(err);
    }
  }
  static async getPackageById(packageId) {
    const [packages] = await db.execute('SELECT * FROM packages WHERE id_package = ?', [
      packageId,
    ]);
    return packages[0];
  }
  static async getAllOffers(tripId) {
    const [
      offers,
    ] = await db.execute('SELECT * FROM packages WHERE id_trip = ? AND status <> 3', [tripId]);
    return offers;
  }
  static async declinePackage(packageId) {
    await db.execute('UPDATE packages SET status = 3 WHERE id_package = ?', [packageId]);
  }
  static async isDuplicate(tripId, senderId) {
    const [rows] = await db.execute('SELECT * FROM packages WHERE id_trip = ? AND id_sender = ?', [tripId, senderId]);
    return rows.length > 0;
  }

  static async isIdiot(tripId, senderId) {
    const [rows] = await db.execute('SELECT id_carrier FROM trips WHERE id_trip = ?', [tripId]);
    return rows[0].id_carrier === senderId;
  }
};
