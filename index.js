#!/usr/bin/env node

import { program } from "commander";
import { load } from "cheerio";

const urlRegex = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
const selectorRegex = /\w/;

const CliMessage = {
  INVALID_URL: "Invalid URL",
  INVALID_SELECTOR: "Invalid CSS selector",
  REQUEST_ERROR: "Page request error",
};

const validateArgs = async ({ url, selector }) => {
  const item = [
    {
      data: url,
      regex: urlRegex,
      message: CliMessage.INVALID_URL,
    },
    {
      data: selector,
      regex: selectorRegex,
      message: CliMessage.INVALID_SELECTOR,
    },
  ].find(({ data, regex }) => !regex?.test(data));

  return item && Promise.reject(item.message);
};

program
  .version("1.0.0")
  .description("HTML text parser")
  .option("-u, --url <string>", "Add target url")
  .option("-s, --selector <string>", "Add target node css selector")
  .action(async (args) => {
    try {
        await validateArgs(args);

        const data = await fetch(args.url).then((res) => res.text());
        const $ = load(data);
        const text = $(args.selector).text();
        console.log(text);
    } catch (err) {
       console.log(err);
    }
  });

program.parse(process.argv);
