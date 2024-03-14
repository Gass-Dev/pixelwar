const WebSocket = require('ws');

// Crée un serveur WebSocket
const wss = new WebSocket.Server({ port: 8082 });

// Stocke les données des pixels
let pixels = {};

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ action: 'init', data: pixels }));

  ws.on('message', (message) => {
    const { action, data, id } = JSON.parse(message);
    console.log(action, data, id);
    if (action === 'draw') {
      pixels[data.id] = data;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ action, data }));
        }
      });
    }
  });
});

console.log('WebSocket server is running on port 8082');
