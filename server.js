const express = require("express")
const fs = require("fs")
const server = express()
const p = "./endpoints/"

for (const f of fs.readdirSync(p)) {
  try {
    const f_ = require(`${p}${f}`)
    server[f_.method](f_.path, (req, res) => {
      f_.run(req, res)
    })
  } catch (err) {
    console.error(`Failed to load ${p}${f}, ${err}`)
  }
}

server.listen(3000, () => {})