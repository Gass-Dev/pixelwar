import { Server as WebSocketServer } from "ws";

const websocketHandler = async (req, res) => {
  // Vérifie si le serveur WebSocket existe déjà
  if (!res.socket.server.ws) {
    // Crée un nouveau serveur WebSocket
    const wss = new WebSocketServer({ noServer: true });

    // Stocke les données des pixels
    let pixels = {};

    wss.on("connection", (ws) => {
      ws.send(JSON.stringify({ action: "init", data: pixels }));

      ws.on("message", (message) => {
        const { action, data, id } = JSON.parse(message);
        console.log(action, data, id);
        if (action === "draw") {
          pixels[data.id] = data;
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ action, data }));
            }
          });
        }
      });
    });

    // Attache le serveur WebSocket à la connexion HTTP
    res.socket.server.ws = wss;

    // Gestion des erreurs et fermer le serveur WebSocket si nécessaire
    res.socket.on("close", () => {
      console.log("Closing WebSocket server...");
      wss.close();
    });
  }

};

export default websocketHandler;
