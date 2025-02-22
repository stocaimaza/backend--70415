import { Router } from "express";
import passport from "passport";

const router = Router(); 

//Ruta Google:
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}) ,async (req, res) => {
    //No necesitamos completar nada, porque todo el trabajo lo hace passport. 
})

//Ruta Callback: 

router.get("/googlecallback", passport.authenticate("google", {failureRedirect: "/login"}) , async (req, res) => {
    req.session.user = req.user; 
    res.redirect("/profile"); 
})

//Logout: 

router.get("/logout", (req, res) => {
    if(req.session.user) {
        console.log("Destruimos la session!"); 
        req.session.destroy(); 
    }
    console.log("Me voy pal login"); 
    res.redirect("/login"); 
})


export default router; 