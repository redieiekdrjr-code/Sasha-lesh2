const http = require('node:http');
const { WebSocketServer, WebSocket } = require('ws');
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200, {'content-type':'application/json'}); return res.end(JSON.stringify({ok:true, app:'IGROgram', clients:wss.clients.size})); }
  res.writeHead(200, {'content-type':'text/plain; charset=utf-8'}); res.end('IGROgram WebSocket server');
});
const wss = new WebSocketServer({ server, maxPayload: 16 * 1024 });
const rooms = new Map();
function send(ws, data) { if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data)); }
wss.on('connection', ws => {
  ws.room = 'lobby';
  ws.on('message', raw => {
    let data; try { data = JSON.parse(raw.toString()); } catch { return send(ws,{type:'error',message:'Invalid JSON'}); }
    if (data.type === 'join') {
      const room = String(data.room || 'lobby').slice(0,64);
      ws.room = room; if (!rooms.has(room)) rooms.set(room,new Set()); rooms.get(room).add(ws);
      return send(ws,{type:'joined',room});
    }
    if (data.type === 'message') {
      const body = String(data.text || '').trim().slice(0,4000); if (!body) return;
      const packet = {type:'message',room:ws.room,text:body,sender:String(data.sender || 'Пользователь').slice(0,40),at:new Date().toISOString()};
      for (const peer of rooms.get(ws.room) || []) send(peer,packet);
    }
  });
  ws.on('close',()=>{ for(const members of rooms.values()) members.delete(ws); });
  send(ws,{type:'welcome',app:'IGROgram'});
});
server.listen(PORT,()=>console.log(`IGROgram listening on ${PORT}`));
module.exports = server;
