import express from  "express";
const router = express.Router();

// import session from "session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
GoogleStrategy.Strategy;


passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null,user)
})



// 🔹 Google Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID:"1018175780906-cah1dj6al89h3t3igscpi4ogadmltet2.apps.googleusercontent.com",
            clientSecret:"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",
            callbackURL:"http://localhost:3000/auth/google/callback"
        },
        (accessToken,refreshToken,profile,done)=>{
            console.log("Google Profile:",profile);
            return done(null,profile);
        }
    )
)


// 🔹 Routes
router.get("/auth/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login"}),
    (req,res) => {
        res.send("✅ Logged in with Google! User: " + JSON.stringify(req.user));
    }
)


router.get("/logout",(req,res)=>{
    req.logout(() => {
        res.redirect("/")
    })
})


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
}


router.get("/dashboard", isLoggedIn, (req,res) => {
    res.send("Welcome " + req.user.displayName);
})



export default router