const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = class User {
  constructor({
    firstName,
    lastName,
    email,
    phoneNum,
    password = '',
    img_url,
  }) {
    this.id_user = uuidv4();
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.phone_num = phoneNum;
    this.password = bcrypt.hashSync(password, 12);
    this.img_url = img_url;
  }

  async save() {
    try {
      const val = await db.execute(
        'INSERT INTO users(id_user, first_name, last_name, email, phone_num, password, img_url) VALUES(?, ?, ?, ?, ?, ?, ?)',
        [
          this.id_user,
          this.first_name,
          this.last_name,
          this.email,
          this.phone_num,
          this.password,
          this.img_url,
        ]
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserById(id) {
    const [users] = await db.execute('SELECT * FROM users WHERE id_user = ?', [
      id,
    ]);
    return users[0];
  }

  static async getUserByEmail(email) {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return users[0];
  }

  static updateUserDetails(
    { firstName, lastName, emailAddress, phoneNumber },
    userId
  ) {
    return db.execute(
      'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_num = ? WHERE id_user = ?',
      [firstName, lastName, emailAddress, phoneNumber, userId]
    );
  }

  static updateImgUrl(url, userId) {
    return db.execute('UPDATE users SET img_url = ? WHERE id_user = ?', [
      url,
      userId,
    ]);
  }
};
