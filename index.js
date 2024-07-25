#!/usr/bin/env node

import { program } from "commander";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const imageExt = [".jpeg", ".webp", ".png"];

const compressionLimits = {
  from: 0.01,
  to: 0.99,
};

const handleCompressImages = async ({ input = "", output = "", coef = 0 }) => {
  const inputPath = path.resolve(input);
  const outputPath = path.resolve(output);

  try {
    await Promise.all([
      fs.promises.access(inputPath),
      fs.promises.access(outputPath),
    ]);

    const isInputDir = (await fs.promises.stat(inputPath)).isDirectory();
    const isOutputDir = (await fs.promises.stat(outputPath)).isDirectory();
    const isCorrectCoef =
      coef >= compressionLimits.from && coef <= compressionLimits.to;

    if (!isInputDir) {
      throw new Error("Input directory was not found");
    }

    if (!isOutputDir) {
      throw new Error("Output directory was not found");
    }

    if (!isCorrectCoef) {
      throw new Error("Incorrect compression coefficient");
    }

    const fileNames = await fs.promises.readdir(inputPath);

    for (const fileName of fileNames) {
      const { ext } = path.parse(fileName);

      if (!imageExt.includes(ext)) continue;

      const image = sharp(path.resolve(inputPath, fileName));
      const { format, width, height } = await image.metadata();

      const quality = coef * 100;
      const newHeight = Math.floor(height * coef);
      const newWidth = Math.floor(width * coef);
      const outputFile = path.resolve(outputPath, fileName);

      await image[format]({ quality })
        .resize(newWidth, newHeight)
        .toFile(outputFile);
    }

    console.log("\n Successfully compressed");
  } catch (error) {
    console.log(error);
  }
};

program
  .version("1.0.0")
  .description("Compresses all the images in input directory")
  .option("-i, --input <string>", "Input path to images directory")
  .option(
    "-o, --output <string>",
    "Output path for compressed images directory"
  )
  .option(
    "-c, --coef <string>",
    `Compression coefficient (${compressionLimits.from} <= coef <= ${compressionLimits.to})`
  )
  .action(handleCompressImages);

program.parse(process.argv);
