import express from "express";
import { spawn } from "child_process";
import path from 'path';
const router = express.Router();

router.get("/", (req, res) => {
  const pathURI = path.resolve("./");
  const inputFile = `${pathURI}/public/input.mp4`;
  const outputFile = `${pathURI}/public/output.mp4`;

  const ffmpeg = spawn("ffmpeg", [
    "-i",
    inputFile,
    "-vcodec",
    "libx264",
    "-crf",
    "28",
    outputFile,
  ]);

  ffmpeg.stdout.on("data", (data) => {
    console.log(`🎥 ffmpeg output: ${data}`);
  });

  ffmpeg.stderr.on("data", (data) => {
    console.error(`⚠️ ffmpeg error: ${data}`);
  });

  ffmpeg.on("close", (code) => {
    console.log(`✅ ffmpeg finished with code ${code}`);
  });
});

export default router;
