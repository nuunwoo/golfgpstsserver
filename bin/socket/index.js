"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.wepSocket = (server) => {
    const clients = new Set();
    const gPad = new Set();
    server.on('connection', (ws, request) => {
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        let type = 'client';
        if (request.headers.pragma) {
            clients.add(ws);
            type = 'client';
            if (ws.readyState === ws.OPEN) {
                // 연결 여부 체크
                ws.send('connection');
            }
        }
        else {
            // if (gPad.size > 0) for (let gpad of gPad) gPad.delete(gpad);
            gPad.add(ws);
            type = 'gpad';
        }
        ws.on('message', msg => {
            const data = `${msg}`;
            if ((data.split('|')[0] === '007' || data.split('|')[0] === '017') && gPad.size > 0) {
                for (let gpad of gPad)
                    gpad.send(data);
            }
            //  else {
            //   if (data.split('|')[0] !== '007' && data.split('|')[0] !== '017') {
            //     for (let client of clients) (client as WebSocket).send(data);
            //   }
            // }
        });
        ws.on('error', error => {
            console.log(`error : ${error}`);
        });
        ws.on('close', () => {
            console.log(`${type} close`);
            for (let gpad of gPad)
                if (ws === gpad)
                    gPad.delete(gpad);
        });
    });
};
