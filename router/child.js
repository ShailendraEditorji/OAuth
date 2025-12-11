import express from "express";
import { fork } from "child_process";
import path from 'path';
const router = express.Router();




// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

router.get("/fib", (req, res) => {
  const n = parseInt(req.query.n) || 40;
  const pathURI = path.resolve("./");
  console.log(pathURI);
  const child = fork(`${pathURI}/utils/worker.js`);
  child.send({ number: n });

  child.on("message", (msg) => {
    res.json({ input: n, result: msg.result });
  });
});




export default router;