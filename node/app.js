const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');

const app = express();

const users =  [];
const houses = [];

app.use(express.json());
app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended:true}));

app.engine('hbs', expHbs({
    defaultLayout: null,
}));

app.set('view engine','.hbs');
app.set('views',path.join(__dirname,'static'));

app.get('/', (req,res) => {
    res.render('register')
});

app.get('/login', (req,res) => {
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.get('/createHouse',(req,res)=>{
    res.render('House');
});

app.get('/users',(req,res)=>{
    res.json(users);
});

app.get('/houses',(req,res)=>{
    res.json(houses);
});

app.get('/users/:user_id', (req, res) => {
    const userID = users.find( user => +req.params.user_id === user.user_id);
    userID ? res.json(userID) :res.json('User is not exist');

});

app.get('/createHouse/:house_id', (req, res) => {
    const houseID = houses.find( house => +req.params.house_id === house.house_id);
    houseID ? res.json(houseID) :res.json('House is not exist');

});


app.post('/register', (req,res) => {
    const user = req.body;
    user.user_id = users.length + 1;
    users.push(user);
    console.log(user);
    res.render('login');
});


app.post('/login', (req,res) => {
    const {Email, Name, Password} = req.body;

    const checkLogin = users.find(user => user.Email === Email && user.UserName === Name && user.UserPassword === Password);

    checkLogin ? res.json(checkLogin): res.json('Error');

});

app.post('/createHouse',(req,res)=>{
    const createHouse=req.body;
    createHouse.house_id = houses.length + 1;
    houses.push(createHouse);
    console.log(createHouse);
    res.redirect('/houses' );
});

app.all('*',(req,res)=>{
    res.json('404 NOT FOUND' );
});

app.listen(5555,()=>{
    console.log('ready');
});

