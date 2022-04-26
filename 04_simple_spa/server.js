const express = require("express");

var app = express();

let database = [];
let id = 100;

app.use(express.json());

app.get("/api/contact", function(req, res){
    return res.status(200).json(database);
});

app.post("/api/contact", function(req, res){
    let contact = {
        "id": id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "phone": req.body.phone
    }
    id++;
    database.push(contact);
    return res.status(201).json(contact);//{"ok":true});
});

app.delete("/api/contact/:id", function(req, res){
    let deleteId = parseInt(req.params.id, 10);
    database = database.filter(obj => obj.id !== deleteId);
    return res.status(200).json({"message":"success!"})
});

app.put("/api/contact/:id", function(req, res){
    let editId = parseInt(req.params.id, 10);
    let contactOption = database.filter(obj=>obj.id === editId)
    for(let i = 0; i<database.length;i++){
        if(database[i].id === editId){
            let contact = {
                "id": editId,
                "firstname": req.body.firstname,
                "lastname": req.body.lastname,
                "email": req.body.email,
                "phone": req.body.phone
            }
            database.splice(i, 1, contact);
            return res.status(200).json({ "message": "success!" });
        }
    }
    return res.status(404).json({ "message": "not found!" });
});


app.use(express.static("static"));

app.listen(3000);
console.log("started");