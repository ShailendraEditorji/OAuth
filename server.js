import express from "express";
const app = express();
import auth from "./router/auth.js"
import child from "./router/child.js"
import spawn from "./router/spawn.js";
import compress from "./router/compress.js";

import session from "express-session";
import passport from 'passport';



app.use(express.json());


// 🔹 Session setup
app.use(
    session({
        secret:"supersecret",
        resave:false,
        saveUninitialized: true
    })
)


app.use(passport.initialize());
app.use(passport.session())
app.use("/",auth)
app.get("/",(req,res)=>{
    res.json({message:"success"});
})

app.use("/child",child)
app.use("/spawn",spawn)
app.use("/compress",compress)




const port = 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})