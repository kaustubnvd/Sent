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
};
