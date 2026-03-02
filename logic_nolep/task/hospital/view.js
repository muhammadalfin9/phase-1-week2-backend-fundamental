class HospitalView {
  static registerView(objArr) {
    console.log(
      `save data success "username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`,
    );
  }

  static help() {
    console.log(`==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>`);
  }

  static loginView(obj) {
    console.log(`Login success, welcome ${obj.username}`);
  }

  static ErrorView(err) {
    console.log(`[ERROR]: ${err}`);
  }

  static showTable(data) {
    console.table(data);
  }
}

module.exports = HospitalView;
