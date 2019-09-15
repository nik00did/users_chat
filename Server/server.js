const val = require("./validator.js");
const mod = require("./model.js");

let express = require("express");
let bodyParse = require("body-parser");
let fs = require("fs");
const urlencodedParser = bodyParse.json();

let model = new mod.Model();
let validator = new val.Validator(model._usersRegistrate.getUsers());
const app = express();

app.get("/checkOnValid", function (req, res) {
    res.send("Получил, держи ответ");
});

app.post("/logIn", urlencodedParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log("/logIn");
    console.log(req.body);

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    console.log(`что пришло`);
    console.log(data.email, data.password);

    const newUser = {
        email: data.email,
        password: data.password
    };

    console.log(newUser.email);
    console.log(newUser.password);

    console.log(`Валидация`);
    if (!validator.isValid(data.email, data.password)) {
        console.log('is valid');
    } else {
        console.log('NO valid');
    }
    console.log(`Проверка регистрации`);
    if (validator.isRegistrate(newUser)) {
        console.log(`ПРОШЕЛ ПРОВЕРКУ`);
        res.send("good_reg");
    } else {
        console.log(`НЕЕЕЕЕЕЕЕ ПРОШЕЛ ПРОВЕРКУ`);

        res.send("bad_reg");
    }

});

app.post("/signIn", urlencodedParser, function (req, res) {

    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(req.body);

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    console.log("/signIn");
    console.log(data.name, data.email, data.configPassword, data.password);

    const newUser = new mod.User(data.name, data.email, data.password);
    model._usersRegistrate.addUser(newUser);
    res.send("good_reg");
});

app.post("/getVectorUser", urlencodedParser, function (req, res) {
    console.log(`getVector`);
    const users = model._usersRegistrate.getUsers();
    console.log(users);

    //this is test data
    let x = new mod.Message('Name_Gena', 'THIS_DAY', 'Some_TEXT');
    model.chatMsg.addMessage(x);
    res.send(users);
});

app.post("/getVectorMsg", urlencodedParser, function (req, res) {
    console.log(`getVector`);
    let x = new mod.Message('Name_Gena', 'THIS_DAY', 'Some_TEXT');
    model.chatMsg.addMessage(x);
    const chat = model.chatMsg.getChat();
    console.log(chat);
    //this is test data
    res.send(chat);
});


app.use(express.static("./public"));

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});

