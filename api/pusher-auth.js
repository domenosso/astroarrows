const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2198163",
  key: "932af3e401d9bf010eb9",
  secret: "e08a3db7d94d5f30da29",
  cluster: "us2",
  useTLS: true
});

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Считываем тело запроса (работает как в формате JSON, так и URL-encoded)
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      const querystring = require("querystring");
      body = querystring.parse(body);
    }
  }

  const socketId = body.socket_id;
  const channel = body.channel_name;

  try {
    const auth = pusher.authorizeChannel(socketId, channel);
    return res.status(200).json(auth);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
