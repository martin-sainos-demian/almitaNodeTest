const express=require('express')
const app=express()
const mysql=require('mysql2')

var bodyParser=require('body-parser')
const res = require('express/lib/response')

var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'n0m3l0',
    database:'prueba'
})

con.connect()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended:true
}))

app.post("/agregarUsuario",(req,res)=>{

    let nombre=req.body.nombre

    con.query("insert into usuario values('"+nombre+"')",(err,respuesta,fields)=>{
        if(err) return console.log("Error",err)

        return res.send("<h1>Nombre:</h1>"+nombre)
    })

})
app.get('/getUsuarios',(req,res)=>{
    con.query('SELECT * FROM usuario',(err,respuesta,field)=>{
    if(err)return console.log('ERROR:',err)
    var userHTML=''
    var i=0
    console.log(respuesta)
    respuesta.forEach(user=>{
        i++
        userHTML+=`<tr><td>${i}</td><td>${user.nombre}</td></tr>`
    })
    return res.send(`<table>
        <tr>
            <th>id</th>
            <th>Nombre: </th>
        </tr>
        ${userHTML}
        </table>`)
    })
})