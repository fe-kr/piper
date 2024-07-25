#!/usr/bin/env node

import { program } from "commander";
import path from "node:path";
import fs from "node:fs";

const handleRenameFiles = async ({ path: filePath, name }) => {
    const pathString = path.resolve(filePath);

    try {
        await fs.promises.access(pathString);
        const stats = await fs.promises.stat(pathString);

        if (stats.isDirectory()) {
            const files = await fs.promises.readdir(pathString);

            files.forEach(async (fileName) => {
                const parsedFileName = path.parse(fileName);
                const oldPath = path.format({ ...parsedFileName, dir: pathString });
                const newPath = path.format({ dir: pathString, name, ext: parsedFileName.ext }); 

                await fs.promises.rename(oldPath, newPath);
            });
        } else {
            throw new Error("Directory was not found");
        }
    } catch (error) {
        console.log(error);
    }
}

program
  .version("1.0.0")
  .description("Bulk rename files in a directory")
  .option("-p, --path <string>", "Path to files")
  .option("-n, --name <string>", "New files name")
  .action(handleRenameFiles);

program.parse(process.argv);