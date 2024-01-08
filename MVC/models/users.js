const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "..", "data", "users.json");

module.exports = class User {
  constructor(uid, username, age) {
    this.username = username;
    this.age = age;
    this.uid = uid;
  }

  save() {
    let users = [];
    fs.readFile(pathToFile, "utf8", (err, data) => {
      if (err) throw err;
      users = JSON.parse(data);
      users.push({uid: this.uid , username: this.username, age: this.age });

      fs.writeFile(pathToFile, JSON.stringify(users), 'utf8', (err) => {
        if(err) throw err;
      })
    });
  }

  static findAll() {
    const data = () => fs.readFileSync(pathToFile, 'utf8');
    return JSON.parse(data());
  }

  static findByUid(uid){
    const data = () => fs.readFileSync(pathToFile, 'utf8');
    const users = JSON.parse(data());
    const user = users.find(e => e.uid === uid);
    return user
  }
};
