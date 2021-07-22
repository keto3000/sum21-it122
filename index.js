import http from "http";
import {parse} from "querystring";
import { getAll, getItem } from "./data.js";

http
  .createServer((req, res) => {
    var path = req.url.toLowerCase();
    let url = req.url.split("?");
    let query = parse(url[1]);
    console.log(query);

    switch (url[0]) {
      // update (home) route to return all array items
      case "/":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(JSON.stringify(getAll()));
        break;


      // create detail route to return and display specific data for first medPlant item: Devil's Club
      case "/detail":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(JSON.stringify(getItem(query.name)));
        break;

      case "/about":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("About: I am a Sci-Fi enthusiast");
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        break;
    }
  })
  .listen(process.env.PORT || 3000);

console.log("after createServer");
