import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import "./extensions";

const folderPath = path.join(__dirname, "calendar");

async function importAndExecute() {
  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const module = await import(filePath);
      const solution = module.default;

      const headline = `Solution for day ${chalk.white(
        file.slice(0, file.indexOf("."))
      )}`;

      console.log(
        `${chalk.bold(headline)} 🎄
          Part 1: ${solution[0]}
          Part 2: ${solution[1]}
          `
      );
    }
  } catch (error) {
    console.error("Error importing and executing files:", error);
  }
}

importAndExecute();
