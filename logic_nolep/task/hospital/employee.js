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
        let beda = data.find((el)=> el.login === true)
        let obj = data.find((el) => el.username === name);
        let newData = data;
        if(!beda){
        if (obj) {
          if (obj.password === password) {
            obj.login = true;

            fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
              if (err) {
                console.log(err);
              } else {
                cb(err, obj);
              }
            });
          } else {
            console.log("Password salah");
          }
        } else {
          console.log("Username tidak ditemukan");
        }
      }else{
        console.log("anda sudah login, TIDAK BISA LOGIN BERSAMAAN.")
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
        console.log(obj)
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
          console.log("anda tidak login di akun manapun");
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
