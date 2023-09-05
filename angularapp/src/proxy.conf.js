const PROXY_CONFIG = [
  {
    context: [
      "/notes",
    ],
    target: "https://localhost:7146",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
