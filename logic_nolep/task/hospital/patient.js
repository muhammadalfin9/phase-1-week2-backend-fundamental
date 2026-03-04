let fs = require("fs");
class Patient {
  constructor(id, nama, diagnosis) {
    this.id = id;
    this.nama = nama;
    this.diagnosis = diagnosis;
  }

  static addPatient(id, nama, penyakit, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Patient(id, nama, penyakit);
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        });
      }
    });
  }
  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Patient