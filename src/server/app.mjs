import { createServer } from 'http';
import { readFile } from 'fs';

const server = createServer((req, res) => {
    const baseURL = "https://localhost/";
    //const basePath = "./src";
    const basePath = "./public";

    const targetURL = new URL(req.url, baseURL);
    let targetPath = "";
    console.log(targetURL);

    if (targetURL.pathname == "/") {
        targetPath = "/index.html";
    } else {
        targetPath = targetURL.pathname;
    }

    try {
        readFile(basePath + targetPath, (err, data) => {
            if (err) throw err;

            switch (true) {
                case /\.html$/.test(targetPath):
                    // index.htmlファイルの処理
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    break;
                case /\.css$/.test(targetPath):
                    // .cssファイルの処理
                    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
                    break;
                case /\.js$/.test(targetPath):
                    // .jsファイルの処理
                    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
                    break;
                case /\.png$/.test(targetPath):
                    // .jsファイルの処理
                    res.writeHead(200, {
                        'Content-Type': 'image/png'
                    });
                    break;
                case /\.jpg$/.test(targetPath):
                    // .jsファイルの処理
                    res.writeHead(200, {
                        'Content-Type': 'image/jpeg'
                    });
                    break;
                default:
                // 上記以外のファイルの処理
            }

            res.write(data);
            res.end();
        })

        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.write("Hello World");
        // res.end();

    } catch (err) {
        console.log(err)
    }








    // readFile('./src/workspace.html', 'UTF-8', (err, data) => {
    //     if (err) throw err;
    //     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //     res.write(data);
    //     res.end();
    // })
});





const port = 8080;
server.listen(port);
console.log('server listen on port: ' + port);



