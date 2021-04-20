#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const program = require("commander");

program.version("1.0.0").description("Log extractor");

program
  .usage("<file> [options]")
  .arguments("<file>")
  .option(
    "-t, --format <format>",
    "Define output file format text or json",
    "text"
  )
  .option("-o, --output [filepath]", "Define output file location")
  .action((file, options) => {
    const { format, output } = options;

    const fileBuffer = fs.readFileSync(file);
    const fileContent = Buffer.from(fileBuffer).toString();

    const outputPath =
      output ||
      path.resolve(
        `log-${new Date().getTime()}.${format === "json" ? "json" : "txt"}`
      );

    fs.writeFileSync(outputPath, fileContent);
  });

program.parse(process.argv);
