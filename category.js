const express = require('express');
const category_router = express.Router();
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const uri = "mongodb+srv://quocanh2105:quocanh123@waifuganktem.rwsm6.mongodb.net/miniproject?retryWrites=true&w=majority";
const mongo = require('mongodb');
const {MongoClient} = require('mongodb');
var bodyParser = require("body-parser");
category_router.use(bodyParser.urlencoded({
    extended: false
}));

category_router.get('/index', async (req,res) => {
    const client = await MongoClient.connect(uri, {useUnifiedTopology : true});
    const db = client.db('asm');
    const collection = db.collection('categories');

    let list_of_categories = await collection.find({}).toArray();

    const template = handlebars.compile(fs.readFileSync('views/categories/index.hbs', 'utf-8'));
    const result = template({
        categories : list_of_categories
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false

    })
    res.render('partials/main.hbs', {
        content: result
    })
})


category_router.get('/view', async (req,res) => {
    let id = req.query.id;
    let o_id = mongo.ObjectID(id);
    const client = await MongoClient.connect(uri, {useUnifiedTopology : true});
    const db = client.db('asm');
    const collection = db.collection('categories');
    const category1 = await collection.findOne({'_id' : o_id});


    const template = handlebars.compile(fs.readFileSync('views/categories/view.hbs', 'utf-8'));
    const result = template({
        category : category1
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})

category_router.get('/update', async (req,res) => {
    
    let id = req.query.id;
    let o_id = mongo.ObjectID(id);
    const client = await MongoClient.connect(uri, {useUnifiedTopology : true});
    const db = client.db('asm');
    const collection = db.collection('categories');
    const category1 = await collection.findOne({'_id' : o_id});

    const template = handlebars.compile(fs.readFileSync('views/categories/update.hbs', 'utf-8'));
    const result = template({
        category : category1
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})




category_router.post('/updateCategory', async (req,res) => {


    let name = req.body.name;
    let id = new mongo.ObjectID(req.body.id);    
    let description = req.body.description;
    const client = await MongoClient.connect(uri, {useUnifiedTopology : true});
    const db = client.db('asm');
    const collection = db.collection('categories');
    
    try {
        var is_update = collection.updateOne({'_id' : id}, {
        $set : {
            name : name,
            description : description
        }
    })
    } catch (error) {
        console.log(error);
    }
    
    res.redirect('/categories/index');
})

category_router.get('/add', async (req,res) => {

    const template = handlebars.compile(fs.readFileSync('views/categories/create.hbs', 'utf-8'));
    const result = template({
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})

category_router.get('/delete', async (req,res) => {
    let id = new mongo.ObjectID(req.query.id);    
    const client = await MongoClient.connect(uri, {useUnifiedTopology : true});
    const db = client.db('asm');
    const collection = db.collection('categories');

    let is_delete = collection.deleteOne({'_id' : id});

    res.redirect('/categories/index');
})


category_router.post('/addCategoryF', async (req,res) => {
    let name = req.body.name;
    let description = req.body.description;
    const client = await MongoClient.connect(uri, {useUnifiedTopology : true});
    const db = client.db('asm');
    const collection = db.collection('categories');

    let is_insert = await collection.insertOne({ 'name' : name, 'description' : description});

    res.redirect('/categories/index');
})

module.exports = category_router;
