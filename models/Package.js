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
    const [
      packages,
    ] = await db.execute('SELECT * FROM packages WHERE id_package = ?', [
      packageId,
    ]);
    return packages[0];
  }
  static async getSenderByPackage(packageId) {
    const [
      packages,
    ] = await db.execute(
      'SELECT id_sender FROM packages WHERE id_package = ?',
      [packageId]
    );
    const senderId = packages[0].id_sender;
    const [senders] = await db.execute(
      'SELECT * FROM users WHERE id_user = ?',
      [senderId]
    );
    return senders[0];
  }
  static async getAllOffers(tripId) {
    const [
      offers,
    ] = await db.execute(
      'SELECT * FROM packages WHERE id_trip = ? AND status <> 3',
      [tripId]
    );
    return offers;
  }
  static async getAllSends(senderId) {
    const [
      sends,
    ] = await db.execute('SELECT * FROM packages WHERE id_sender = ?', [
      senderId,
    ]);
    return sends;
  }
  static async declinePackage(packageId) {
    await db.execute('UPDATE packages SET status = 3 WHERE id_package = ?', [
      packageId,
    ]);
  }
  static async isDuplicate(tripId, senderId) {
    const [
      rows,
    ] = await db.execute(
      'SELECT * FROM packages WHERE id_trip = ? AND id_sender = ?',
      [tripId, senderId]
    );
    return rows.length > 0;
  }

  static async isIdiot(tripId, senderId) {
    const [
      rows,
    ] = await db.execute('SELECT id_carrier FROM trips WHERE id_trip = ?', [
      tripId,
    ]);
    return rows[0].id_carrier === senderId;
  }

  static async cancelRequest(packageId) {
    await db.execute('DELETE FROM packages WHERE id_package = ?', [packageId]);
  }

  static async getPackagesSent(userId) {
    const [
      packages,
    ] = await db.execute(
      'SELECT COUNT(id_sender) FROM packages WHERE id_sender = ? AND status = 2',
      [userId]
    );
    const { 'COUNT(id_sender)': count } = packages[0];
    return count;
  }

  static async getPackagesCarried(userId) {
    const [
      packages,
    ] = await db.execute(
      'SELECT price FROM trips WHERE id_carrier = ? AND date < ? AND id_package IS NOT NULL',
      [userId, new Date().toISOString().split('T')[0]]
    );
    return packages;
  }
};
