let fs = require("fs");
let Employee = require("./employee");
class Patient {
  constructor(nama, diagnosis) {
    this.id = crypto.randomUUID();
    this.nama = nama;
    this.diagnosis = diagnosis;
  }

  static addPatient(nama, penyakit, cb) {
    this.findAllpt((err, data) => {
      if (err) {
        console.log(err);
      } else {
        Employee.findAll((err, emp) => {
          if (err) {
            console.log(err);
          } else {
            let dokter = emp.find(
              (el) => el.login === true && el.position === "dokter",
            );
            if (dokter) {
              let obj = new Patient(nama, penyakit);
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
            } else {
              cb("HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.");
            }
          }
        });
      }
    });
  }

  static updatePatient(nama, penyakit, cb) {
    this.findAllpt((err, data) => {
      if (err) {
        console.log(err);
      } else {
        Employee.findAll((err, emp) => {
          if (err) {
            console.log(err);
          } else {
            let dokter = emp.find(
              (el) => el.login === true && el.position === "dokter",
            );
            if (dokter) {
              let obj = data.find((el) => el.nama === nama);
              obj.diagnosis = penyakit;
              fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  cb(err, obj);
                }
              });
            } else {
              cb("HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.");
            }
          }
        });
      }
    });
  }

  static deletePatient(id, cb) {
    this.findAllpt((err, data) => {
      if (err) {
        console.log(err);
      } else {
        Employee.findAll((err, emp) => {
          if (err) {
            console.log(err);
          } else {
            let dokter = emp.find(
              (el) => el.login === true && el.position === "dokter",
            );
            if (dokter) {
              let pasien = data.find((el) => el.id == id);
              let obj = data.filter((el) => el.id !== id);
              if (!pasien) cb("id tidak ditemukan");
              fs.writeFile("./patient.json", JSON.stringify(obj), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  cb(err, pasien);
                }
              });
            } else {
              cb("HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.");
            }
          }
        });
      }
    });
  }
  static show(cb) {
    this.findAllpt((err, data) => {
      if (err) {
        console.log(err);
      } else {
        Employee.findAll((err, emp) => {
          if (err) {
            console.log(err);
          } else {
            let dokter = emp.find(
              (el) => el.login === true && el.position === "dokter",
            );
            if (dokter) {
              cb(null, data);
            } else {
              cb("HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.");
            }
          }
        });
      }
    });
  }

  static findPatientBy(input, cb) {
    this.findAllpt((err, data) => {
      if (err) {
        console.log(err);
      } else {
        Employee.findAll((err, emp) => {
          if (err) {
            console.log(err);
          } else {
            let dokter = emp.find(
              (el) => el.login === true && el.position === "dokter",
            );
            if (dokter) {
              let cari = data.find(
                (el) => el.id === input || el.nama === input,
              );
              if (cari) cb(null, cari);
              else cb("data tidak ditemukan");
            } else {
              cb("HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.");
            }
          }
        });
      }
    });
  }
  static findAllpt(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Patient;
