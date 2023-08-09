import { exec } from "child_process";

// Function to execute a shell command and return a Promise with the output
const runCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Function to run all the commands and display appropriate messages
const runChecks = async () => {
  try {
    console.log("Running format check...");
    await runCommand("yarn check-format");
    console.log("✅ Format check passed.");

    console.log("Running lint check...");
    await runCommand("yarn lint");
    console.log("✅ Lint check passed.");

    console.log("Running type check...");
    await runCommand("yarn check-types");
    console.log("✅ Type check passed.");

    console.log("Building the project...");
    await runCommand("yarn build");
    console.log("✅ Test build passed.");

    console.log("All checks passed! ");
  } catch (error) {
    console.error("❌ Error occurred:", error);
  }
};

// Run the checks
runChecks();
