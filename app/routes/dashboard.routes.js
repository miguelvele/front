import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const dash = Router();

// Ruta vista inicio
dash.get("/inicio", (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 0
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

// Ruta vista usuarios
dash.get("/usuario", async (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(
                req.cookies.ckmp,
                process.env.SECRET_KEY
                )

            let ruta = "http://localhost:3000/api/user";
            let option = {
                method:"GET",
            }
            let datos = {};
            const result = await fetch(ruta, option)
            .then(response => response.json())
            .then(data =>{
                datos = data[0]
                //console.log(data[0]);
            })
            .catch(err => console.error("error en peticion" + err))
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 1,
                "datos": datos
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

// Ruta para ver productos
dash.get("/producto", (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 2
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

// Ruta para ver categorias
dash.get("/categoria", (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 3
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

dash.post("/guardar", (req, res)=>{
    if (req.body.name) {

        
        let ruta = "http://localhost:3000/api/user";
        let metodo = "POST";
        let data ={
            name: req.body.name
        }



        let option = {
            method : metodo,
            Headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            }
        

        try {
            const result = fetch(ruta, option)
            .then(res => res.json())
            .then(data =>{
                console.log("Datos guardados")
            })
            
            .catch(err => console.log("error al consumir la api " + err))
            res.redirect("/v1/usuario")
        } catch (error) {
            
        }

        //res.send(" bro, guardaste lo siguente: " + req.body.name)
    }else{
        res.send("error")
    }
})

// Ruta para salir del dash
dash.get("/salir", (req, res) => {
    res.clearCookie("ckmp");
    res.redirect("/");
});

export default dash;