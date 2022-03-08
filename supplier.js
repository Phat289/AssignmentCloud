const express = require('express');
const supplier_router = express.Router();
const handlebars = require('handlebars');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const uri = "mongodb+srv://quocanh2105:quocanh123@waifuganktem.rwsm6.mongodb.net/miniproject?retryWrites=true&w=majority";
const mongo = require('mongodb');
const {
    MongoClient
} = require('mongodb');
var bodyParser = require("body-parser");
supplier_router.use(bodyParser.urlencoded({
    extended: false
}));


supplier_router.get('/index', async (req, res) => {
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    const db = client.db('asm');
    const collection = db.collection('suppliers');

    let suppliers1 = await collection.find({}).toArray();
    const template = handlebars.compile(fs.readFileSync('views/suppliers/index.hbs', 'utf-8'));
    const result = template({
        suppliers: suppliers1
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false

    })

    res.render('partials/main.hbs', {
        content: result
    })
})

supplier_router.get('/add', async (req, res) => {
    const template = handlebars.compile(fs.readFileSync('views/suppliers/create.hbs', 'utf-8'));
    const result = template({}, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})

supplier_router.post('/addSupplier', async (req, res) => {
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    const db = client.db('asm');
    const collection = db.collection('suppliers');

    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let address = req.body.address;
    let description = req.body.description;
    const doc = {
        'name': name,
        'phone': phone,
        'email': email,
        'address': address,
        'description': description
    };


    const is_insert = collection.insertOne(doc);


    res.redirect('/suppliers/index');
})





supplier_router.get('/view', async (req, res) => {
    let id = req.query.id;
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    const db = client.db('asm');
    const collection = db.collection('suppliers');
    let o_id = mongo.ObjectID(id);
    const supplier1 = await collection.findOne({
        '_id': o_id
    });

    console.log(supplier1);
    const template = handlebars.compile(fs.readFileSync('views/suppliers/view.hbs', 'utf-8'));
    const result = template({
        supplier: supplier1
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})


supplier_router.get('/update', async (req, res) => {
    let id = mongo.ObjectID(req.query.id);
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    const db = client.db('asm');
    const collection = db.collection('suppliers');

    let supplier1 = await collection.findOne({
        '_id': id
    });

    const template = handlebars.compile(fs.readFileSync('views/suppliers/update.hbs', 'utf-8'));
    const result = template({
        supplier: supplier1
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})


supplier_router.post('/updateSupplier', async (req, res) => {
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    const db = client.db('asm');
    const collection = db.collection('suppliers');

    let id = mongo.ObjectID(req.body.id);
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let address = req.body.address;
    let description = req.body.description;

    console.log(id);
    var is_update = collection.updateOne({'_id': id}, {
        $set: {
            name: name,
            phone: phone,
            email: email,
            address: address,
            description: description
        }
    });

    res.redirect('/suppliers/index');
})

supplier_router.get('/delete', async (req,res) => {
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    const db = client.db('asm');
    const collection = db.collection('suppliers');

    let id = mongo.ObjectID(req.query.id);
    
    let is_delete = await collection.deleteOne({'_id' : id});

    res.redirect('/suppliers/index');
})


module.exports = supplier_router;
