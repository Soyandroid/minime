import logger from "debug";
import express, { NextFunction, Request, Response } from "express";

const debug = logger("app:idz:news");

export default function createNews(port: number, host: string) {
  const app = express();

  app.disable("x-powered-by");
  app.disable("etag");

  app.get(["/news/news80EX.txt", "/news/news80JP.txt"], (req, res) => {
    const client_ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    debug("news80EX.txt requested from: %s", client_ip);
    res.set("Content-Type", "text/plain");
    res.set("charset", "utf-8");
    res.setHeader("Last-Modified", new Date().toUTCString());
    res.set("Connection", "close");
    res.status(200);
    const news_string =
      process.env.IDZ_NEWS || "Welcome to Initial D Arcade Stage Zero";
    res.send(getNewsDateAsString() + news_string + "\r\n");
  });

  app.listen(port, host, err => {
    if (err) {
      debug("News server has encountered an error:  ", err);
    }

    debug("News server is listening on port ", port);
  });
}

function getNewsDateAsString() {
  const pastDate: Date = new Date();
  const futureDate: Date = new Date();
  pastDate.setFullYear(new Date().getFullYear() - 1);
  futureDate.setFullYear(new Date().getFullYear() + 1);
  let pastDateString =
    pastDate.getFullYear().toString() +
    "/" +
    (pastDate.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    pastDate
      .getDate()
      .toString()
      .padStart(2, "0") +
    " " +
    pastDate
      .getHours()
      .toString()
      .padStart(2, "0") +
    ":" +
    pastDate
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    ":" +
    pastDate
      .getSeconds()
      .toString()
      .padStart(2, "0");
  let futureDateString =
    futureDate.getFullYear().toString() +
    "/" +
    (futureDate.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    futureDate
      .getDate()
      .toString()
      .padStart(2, "0") +
    " " +
    futureDate
      .getHours()
      .toString()
      .padStart(2, "0") +
    ":" +
    futureDate
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    ":" +
    futureDate
      .getSeconds()
      .toString()
      .padStart(2, "0");
  let finalDateString = pastDateString + " " + futureDateString + " ";
  return finalDateString;
}
