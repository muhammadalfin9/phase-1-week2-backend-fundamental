let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Employee(name, password, role);
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        });
      }
    });
  }
  static login(name, password, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let beda = data.find((el) => el.login === true);
        let obj = data.find((el) => el.username === name);
        let newData = data;
        if (!beda) {
          if (obj) {
            if (obj.password === password) {
              obj.login = true;

              fs.writeFile(
                "./employee.json",
                JSON.stringify(newData),
                (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    cb(err, obj);
                  }
                },
              );
            } else {
              cb("Password salah");
            }
          } else {
            cb("Username tidak ditemukan");
          }
        } else {
          cb("anda sudah login, TIDAK BISA LOGIN BERSAMAAN.");
        }
      }
    });
  }

  static logout(cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = data.find((el) => el.login === true);
        let newData = data;
        if (obj) {
          obj.login = false;
          fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
            if (err) {
              console.log(err);
            } else {
              cb(err, obj);
            }
          });
        } else {
          cb("anda tidak login di akun manapun");
        }
      }
    });
  }
  static show(cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let admin = data.find(
          (el) => el.login === true && el.position === "admin",
        );
        if (admin) {
          cb(null, data);
        } else {
          cb("HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.");
        }
      }
    });
  }

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Employee;
