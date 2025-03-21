import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";

class UserController {
    async register(req, res) {
        const { first_name, last_name, email, age, password } = req.body;

        try {
            const nuevoUsuario = await userService.registerUser({ first_name, last_name, email, age, password });

            const token = jwt.sign({
                usuario: `${nuevoUsuario.first_name} ${nuevoUsuario.last_name}`,
                email: nuevoUsuario.email,
                role: nuevoUsuario.role
            }, "coderhouse", { expiresIn: "1h" });

            res.cookie("coderCookieToken", token, { maxAge: 360000, httpOnly: true });
            res.redirect("/api/sessions/current");
        } catch (error) {
            res.status(500).send("Error del Server TERRIBLEEE");
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await userService.loginUser(email, password);
            console.log(user); 
              
                    
            const token = jwt.sign({
                usuario: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role
            }, "coderhouse", { expiresIn: "1h" });
            
            console.log("Hasta el codigo va bien!"); 
            
            res.cookie("coderCookieToken", token, { maxAge: 360000, httpOnly: true });
            res.redirect("/api/sessions/current");
        } catch (error) {
            res.status(500).send("Error del Server TERRIBLEEE");
        }
    }

    async current(req, res) {
        if (req.user) {
            const user = req.user;
            res.render("home", { user });
        } else {
            res.send("No autorizado");
        }
    }

    async logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    }
}

export default UserController;  