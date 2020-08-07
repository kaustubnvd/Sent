const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = class User {
  constructor({ firstName, lastName, email, phoneNum, password = '' }) {
    this.id = Math.random();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNum = phoneNum;
    this.password = bcrypt.hashSync(password, 12);
  }

  async save() {
    try {
      const val = await db.execute(
        'INSERT INTO users(id_user, first_name, last_name, email, phone_num, password) VALUES(?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.firstName,
          this.lastName,
          this.email,
          this.phoneNum,
          this.password,
        ]
      );
      console.log(val);
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserById(id) {
    const [users] = await db.execute('SELECT * FROM users WHERE id_user = ?', [id]);
    return users[0];
  }
};