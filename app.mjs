import express from "express";
import path from "path";
import { readFile } from "fs";
import dotenv from "dotenv";

// read .env file
dotenv.config();

const webRouter = express.Router();
const apiRouter = express.Router();

let app = express();

app.use("/", webRouter);
app.use("/api", apiRouter);

const port = 8080;

const basePath = new URL("./public", import.meta.url).pathname;

/*
 *  Web Router
 */

webRouter.get("/", function (req, res) {
  const targetPath = "/index.html";

  const contentType = getContentTypes(targetPath);

  readFile(basePath + targetPath, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.write(data);
    res.end();
  });
});

webRouter.get("/webdesign/*", function (req, res) {
  const targetPath = req.path;

  const contentType = getContentTypes(targetPath);

  readFile(basePath + targetPath, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.write(data);
    res.end();
  });
});

webRouter.get("/img/*", function (req, res) {
  const targetPath = req.path;

  const contentType = getContentTypes(targetPath);

  readFile(basePath + targetPath, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.write(data);
    res.end();
  });
});

/*
 *  API Router
 */

apiRouter.get("/apiKey", function (req, res) {
  res.send(process.env.CONTENTFUL_ACCESS_TOKEN);
});

function getContentTypes(targetPath) {
  const extension = path.extname(targetPath).toLowerCase();
  // console.log('taregtPath: ' + targetPath + ', extension: ' + extension);
  switch (extension) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpeg";
    default:
      return "application/octet-stream";
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Used following before using express.Router()
//

// app.use((req, res) => {
//     const targetPath = req.path === "/" ? "/index.html" : req.path;

//     const contentType = getContentTypes(targetPath);

//     readFile(basePath + targetPath, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(404);
//             return;
//         }
//         res.writeHead(200, { 'Content-Type': contentType });
//         res.write(data);
//         res.end();
//     });
// });
