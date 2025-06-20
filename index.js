const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.setHeader('Content-Type', 'application/json');

    if (path === '/static') {
        res.writeHead(200);
        res.end(JSON.stringify({ header: 'Hello', body: 'Octagon NodeJS Test' }));
    } else if (path === '/dynamic') {
        const a = parseFloat(query.a);
        const b = parseFloat(query.b);
        const c = parseFloat(query.c);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            res.writeHead(400);
            res.end(JSON.stringify({ header: 'Error' }));
        } else {
            const result = (a * b * c) / 3;
            res.writeHead(200);
            res.end(JSON.stringify({ header: 'Calculated', body: result.toString() }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ header: 'Error' }));
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
