import express from 'express';
import path from 'path';
import { readFile } from 'fs';

const app = express();
const port = 8080;

const basePath = new URL('./public', import.meta.url).pathname;

app.use((req, res) => {
    const targetPath = req.path === "/" ? "/index.html" : req.path;

    const contentType = getContentTypes(targetPath);

    readFile(basePath + targetPath, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(404);
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    });
});

function getContentTypes(targetPath) {
    const extension = path.extname(targetPath).toLowerCase();
    // console.log('taregtPath: ' + targetPath + ', extension: ' + extension);
    switch (extension) {
        case '.html':
            return 'text/html; charset=utf-8';
        case '.css':
            return 'text/css; charset=utf-8';
        case '.js':
            return 'text/javascript; charset=utf-8';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream';
    }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});



// import { createServer } from 'http';
// import { readFile } from 'fs';

// const server = createServer((req, res) => {
    // const baseURL = "https://localhost/";
    // //const basePath = "./src";
    // const basePath = "./public";

    // const targetURL = new URL(req.url, baseURL);
    // let targetPath = "";
    // console.log(targetURL);

    // if (targetURL.pathname == "/") {
    //     targetPath = "/index.html";
    // } else {
    //     targetPath = targetURL.pathname;
    // }

    // try {
    //     readFile(basePath + targetPath, (err, data) => {
    //         if (err) throw err;

    //         switch (true) {
    //             case /\.html$/.test(targetPath):
    //                 // index.htmlファイルの処理
    //                 res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //                 break;
    //             case /\.css$/.test(targetPath):
    //                 // .cssファイルの処理
    //                 res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
    //                 break;
    //             case /\.js$/.test(targetPath):
    //                 // .jsファイルの処理
    //                 res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
    //                 break;
    //             case /\.png$/.test(targetPath):
    //                 // .jsファイルの処理
    //                 res.writeHead(200, {
    //                     'Content-Type': 'image/png'
    //                 });
    //                 break;
    //             case /\.jpg$/.test(targetPath):
    //                 // .jsファイルの処理
    //                 res.writeHead(200, {
    //                     'Content-Type': 'image/jpeg'
    //                 });
    //                 break;
    //             default:
    //             // 上記以外のファイルの処理
    //         }

    //         res.write(data);
    //         res.end();
    //     })

    //     // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //     // res.write("Hello World");
    //     // res.end();

    // } catch (err) {
    //     console.log(err)
    // }








//     // readFile('./src/workspace.html', 'UTF-8', (err, data) => {
//     //     if (err) throw err;
//     //     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//     //     res.write(data);
//     //     res.end();
//     // })
// });





// const port = 8080;
// server.listen(port);
// console.log('server listen on port: ' + port);



