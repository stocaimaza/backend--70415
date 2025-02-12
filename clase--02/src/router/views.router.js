import { Router } from "express";
const router = Router(); 

router.get("/login", (req, res) => {
    if(req.session.user) {
        return res.redirect("/profile"); 
    }
    res.render("login"); 
})

router.get("/register", (req, res) => {
    if(req.session.user) {
        return res.redirect("/profile"); 
    }
    res.render("register"); 
})

router.get("/profile", (req, res) => {
    //Verifico si el usuario esta logueado: 
    if(!req.session.user) {
        return res.redirect("/login");
    }
    res.render("profile", {user: req.session.user}); 
})

export default router; 