const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const ejs = require('ejs')

const app = express()

app.set('view engine','ejs')
app.use(express.static(__dirname + '/static'))


app.use(bodyParser.urlencoded({
    extended: true
}))

var con = mysql.createConnection({
    host: "studiviadb.cnreudh8065g.ap-south-1.rds.amazonaws.com",
    port: "3306",
    user: "auspy",
    password: "password",
    database: "studiviaDB"
})

con.connect(function(err){
    if(err)throw err;
    console.log("connected!");
})

app.listen(8000, () => {
    console.log('server started yes')
})

app.get('/',(req,res)=>{
    let sql = "SELECT username FROM userLedger"
    con.query(sql,(err,users)=>{
        if(err) throw err;
        console.log("users",users);
    })
    res.render("index",{usersHtml : users})
    
})