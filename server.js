const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Ein Client verbunden');

  ws.on('message', function incoming(message) {
    console.log('Empfangen: %s', message);

    // Nachricht an alle verbundene Clients senden (Broadcast)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client getrennt');
  });
});

console.log('WebSocket-Server läuft auf ws://localhost:8080');
