// # LOGIC NOLEP (async.js)

// const { reject } = require("async");

// **async.js: Asynchronous JavaScript**

// **Deskripsi**:
// Kalian akan membuat tugas sederhana untuk memahami konsep asynchronous JavaScript menggunakan callback, Promise, dan async/await.

// Soal:

// 1. Callback:

// Buatlah fungsi getUserData yang mengambil data pengguna dari server dengan menggunakan pendekatan callback. Fungsi ini akan menerima sebuah callback sebagai argumen dan akan mengembalikan data pengguna setelah simulasi pengambilan data selesai.

// 2. Promise:

// Ubahlah fungsi getUserData menjadi pendekatan Promise. Kembalikan data pengguna menggunakan resolve ketika simulasi pengambilan data selesai dan menggunakan reject jika terjadi kesalahan.

// 3. Async/Await:

// Ubahlah kode fungsi getUserData menjadi pendekatan async/await.

// **Test Case**:
// Panggil fungsi getUserData dengan pendekatan callback, Promise, dan async/await. Setelah masing-masing tugas selesai, tampilkan hasilnya.

const users = [
  { id: 1, username: "john_doe" },
  { id: 2, username: "jane_smith" },
  { id: 3, username: "alice" },
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  setTimeout(() => {
    const u = users.find((n) => n.id === userId);
    u ? callback(u) : callback("user not found");
  }, 0);
}

// Implementasi Promise
function getUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    const u = users.find((n) => n.id === userId);
    u ? resolve(u) : reject("user not found");
  });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  try {
    const u = users.find((n) => n.id === userId);
    if (!u) throw new Error("User tidak ditemukan");
    return u
  } catch (e) {
    return e.message;
  }
}

// Test Case Callback
getUserDataCallback(1, (user) => {
  console.log("Callback Result:", user);
  // Output: Callback Result: { id: 1, username: 'john_doe' }
});

// Test Case Promise
getUserDataPromise(2)
  .then((user) => {
    console.log("Promise Result:", user);
    // Output: Promise Result: { id: 2, username: 'jane_smith' }
  })
  .catch((error) => {
    console.error(error);
  });

// Test Case Async/Await
(async () => {
  const user = await getUserDataAsync(3);
  console.log("Async/Await Result:", user);
  
})();
