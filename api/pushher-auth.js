const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2198163",
  key: "932af3e401d9bf010eb9",
  secret: "e08a3db7d94d5f30da29",
  cluster: "us2",
  useTLS: true
});

module.exports = async (req, res) => {
  // Разрешаем CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  try {
    const auth = pusher.authorizeChannel(socketId, channel);
    return res.send(auth);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
