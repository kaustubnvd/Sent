const db = require('../config/db');

module.exports = class User {
  constructor({ firstName, lastName, email, phoneNum, password = '' }) {
    this.id = Math.random();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNum = phoneNum;
    this.password = password;
  }

  async save() {
    try {
      const val = await db.execute(
        'INSERT INTO users(id_user, first_name, last_name, email, phone, password) VALUES(?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.firstName,
          this.lastName,
          this.email,
          this.phoneNum,
          this.password,
        ]
      );
    } catch (err) {
      console.log(err);
    }
  }
};
