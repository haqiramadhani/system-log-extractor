#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const program = require("commander");

program.version("1.0.0").description("Log extractor");

program.usage("<file> [options]");

program.arguments("<file>");

program.option(
  "-t, --format <format>",
  "Specify output file format text or json",
  "text"
);

program.option("-o, --output [filepath]", "Specify output file location");

program.action((file, options) => {
  // parsing options data
  const { format, output } = options;

  // check file
  if (!fs.existsSync(path)) console.log("Log file not found!");

  // read file
  const fileBuffer = fs.readFileSync(file);
  const fileContent = Buffer.from(fileBuffer).toString();

  // save
  const outputPath =
    output ||
    path.resolve(
      `log-${new Date().getTime()}.${format === "json" ? "json" : "txt"}`
    );
  fs.writeFileSync(outputPath, fileContent);
});

program.parse(process.argv);
