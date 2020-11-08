const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const myjwtsecretkey = "mi_clave_Secreta";
const Sequelize = require('sequelize')
const app = express();
app.use(express.json());
const PORT = 80;

 const config = {
     username: "root",
     password: "root",
     database: "Delilah",
     host: "localhost",
     dialect: "mysql"
 }

 const sequelize = new Sequelize(config);

 sequelize.authenticate()
 .then(() => {
     console.log('Funciona!');
 })
 .catch(err => {
     console.error('Np funciona, porque', err);
 });

 app.post("/user",(pedido,respuesta) => {
     const{
         
        Username,
        Fullname,
        Email,
        Phone,
        Adress,
        Pass,
        Accesos
     
    } = pedido.body;

    sequelize.query('insert into USUARIO (Username,Fullname,Email,Phone,Adress,Pass,Accesos)values(" ' +Username +' "," '+Fullname+' "," '+ Email+' "," '+Phone+ ' "," '+Adress+ ' "," '+Pass+ ' "," '+Accesos+' ")',
    {
        type: sequelize.QueryTypes.INSERT
    }).then((resultado) => {
        console.log( resultado[0])
        const payload = {
            "ID":resultado[0],
            "Usuario":Username,
            "pass":Pass,
            "Rol":Accesos
        }
        const token=jsonwebToken.sing(payload,myjwtsecretkey);
        console.log(token)
        respuesta.json({ "Status": token });
    }).catch((error) => {
        respuesta.json({ "Status": error });
    });
})
app.listen(PORT,()=>console.log(" PUERTO EJECUTANDOSE "+PORT));
