import readline from "readline";
import fs from "fs/promises";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

let users = [];
let currentUser = null;

async function loadUsers() {
  try {
    const data = await fs.readFile("users.json", "utf8");
    users = JSON.parse(data);
  } catch (err) {
    console.log("Tidak ada file users.json. Akan dibuat file baru.");
  }
}

async function saveUsers() {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

async function login() {
  console.clear();
  console.log(chalk.blue.bold("=== Login ==="));
  const username = await question(chalk.yellow("Username: "));
  const password = await question(chalk.yellow("Password: "));

  await loadUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    currentUser = user;
    user.status = "online";
    await saveUsers(users);
    console.log(chalk.green("Login successful!"));
    console.log(chalk.cyan(`Welcome back, ${username}!`));
    await mainMenu();
  } else {
    console.log(chalk.red("Invalid username or password."));
  }
}

async function register() {
  console.clear();
  console.log(chalk.blue.bold("=== Register ==="));
  const username = await question(chalk.yellow("Choose a username: "));
  const password = await question(chalk.yellow("Choose a password: "));
  await loadUsers();
  if (users.some((u) => u.username === username)) {
    console.log(chalk.red("Username already exists."));
  } else {
    users.push({
      username,
      password,
      status: "offline",
      hinghestScore: null,
    });
    await saveUsers(users);
    console.log(chalk.green("Registration successful!"));
  }
}

async function startMenu() {
  console.clear();
  while (true) {
    console.log("\n");
    console.log(chalk.blue.bold("=== Guessing Game ==="));
    console.log(chalk.yellow("1. Login"));
    console.log(chalk.yellow("2. Register"));
    console.log(chalk.yellow("3. Keluar"));
    const choice = await question(chalk.magenta("Enter your choice (1-3): "));

    switch (choice) {
      case "1":
        await login();
        break;
      case "2":
        await register();
        break;
      case "3":
        console.log(chalk.green("Goodbye!"));
        rl.close();
        return;
      default:
        console.log(chalk.red("Invalid choice. Please try again."));
    }
  }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
  console.clear();
  while (true) {
    console.log("\n");
    console.log(chalk.blue.bold("=== Main Menu ==="));
    console.log(chalk.yellow("1. Play Game"));
    console.log(chalk.yellow("2. Show Leaderboard"));
    console.log(chalk.yellow("3. Logout"));
    const choice = await question(chalk.magenta("Enter your choice (1-3): "));

    switch (choice) {
      case "1":
        await playGame();
        break;
      case "2":
        await showLeaderboard();
        break;
      case "3":
        await logout();
        return;
      default:
        console.log(chalk.red("Invalid choice. Please try again."));
    }
  }
}

async function showLeaderboard() {
  console.clear();
  let leaderboard = users
    .filter((u) => u.hinghestScore !== null)
    .sort((a, b) => a.hinghestScore - b.hinghestScore)
    .slice(0, 10);

  console.log(chalk.blue.bold("=== Leaderboard ==="));
  if (leaderboard.length === 0) {
    console.log(chalk.yellow("belum ada pemain yang menyelesaikan permainan."));
  } else {
    leaderboard.forEach((user, index) => {
      const statusColor = user.status === "online" ? chalk.green : chalk.red;
      console.log(
        statusColor(
          `${index + 1}. ${user.username} - ${user.hinghestScore} tebakan`,
        ),
      );
    });
  }
}

async function playGame() {
  console.clear();
  let angkaAcak = Math.floor(Math.random() * 100) + 1;
  let tebakan = null;
  let jumlahTebakan = 0;

  console.log(chalk.cyan("Welcome to the Guessing Game!"));
  console.log(
    chalk.cyan(
      "I have selected a random number between 1 and 100. Can you guess it?",
    ),
  );

  while (tebakan !== angkaAcak) {
    tebakan = parseInt(await question(chalk.yellow("Enter your guess: ")));
    jumlahTebakan++;

    if (tebakan < angkaAcak) {
      console.log(chalk.blue("Terlalu rendah! Try again."));
    } else if (tebakan > angkaAcak) {
      console.log(chalk.blue("Terlalu tinggi! Try again."));
    } else {
      console.clear();
      console.log(
        chalk.green(
          `Selamat! anda menebak dengan benar dalam ${jumlahTebakan} percobaan.`,
        ),
      );
      if (
        !currentUser.hinghestScore ||
        jumlahTebakan < currentUser.hinghestScore
      ) {
        currentUser.hinghestScore = jumlahTebakan;
        await saveUsers(users);
        console.log(chalk.green("New high score!"));
      }
    }
  }
}

async function logout() {
  console.clear();
  currentUser.status = "offline";
  await saveUsers(users);
  console.log(chalk.green("You have been logged out."));
  currentUser = null;
}

// await makeGuess();

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  await startMenu();
}

await main();
