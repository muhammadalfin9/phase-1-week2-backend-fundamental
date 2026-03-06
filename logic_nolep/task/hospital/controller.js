let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");
/*
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>

NOTE :

1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
2. TIDAK BISA LOGIN BERSAMAAN.
3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.

*/
class HospitalController {
  static help() {
    HospitalView.help();
  }
  static register(name, password, role) {
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.registerView(objArr);
      }
    });
  }
  static login(name, password) {
    Employee.login(name, password, (err, obj) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.loginView(obj);
      }
    });
  }
  static logout() {
    Employee.logout((err, obj) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.logout(obj);
      }
    });
  }
  static addPatient(nama, penyakit) {
    Patient.addPatient(nama, penyakit, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.addpView(objArr);
      }
    });
  }
  static updatePatient(nama, penyakit) {
    Patient.updatePatient(nama, penyakit, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.updView(objArr);
      }
    });
  }
  static deletePatient(id) {
    Patient.deletePatient(id, (err, pasien) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else if (pasien) {
        HospitalView.suces(pasien);
      }
    });
  }
  static show(input) {
    if (input === "patient") {
      Patient.show((err, data) => {
        if (err) {
          HospitalView.ErrorView(err);
        } else {
          HospitalView.showTable(data);
        }
      });
    } else {
      Employee.show((err, data) => {
        if (err) {
          HospitalView.ErrorView(err);
        } else {
          HospitalView.showTable(data);
        }
      });
    }
  }
  static findPatientBy(input) {
    Patient.findPatientBy(input, (err, data) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.showTable(data);
      }
    });
  }
}

module.exports = HospitalController;
