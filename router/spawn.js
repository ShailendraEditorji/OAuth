import express from "express";
import { spawn } from 'child_process';
const child = spawn('ping', ['google.com']);
const router = express.Router();

router.get("/",(req,res)=>{
// Listen for live output
child.stdout.on("data",(data)=>{
    console.log(`📡 OUTPUT: ${data}`)
});

// Listen for errors
child.stderr.on("data",(data)=>{
console.error(`❌ ERROR: ${data}`)
})

// Listen when process ends
child.on('close',(code)=>{
    console.log(`✅ Child process exited with code ${code}`)
})
})


export default router;