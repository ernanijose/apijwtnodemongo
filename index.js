require("dotenv").config();
const express = require('express');
const app = new express();
const mongoose = require('mongoose');


//conectando ao mongodb
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true
    },
    () => {
    console.log('Conectou ao banco de dados mongodb');
});

//importando o routes
const authRoute = require('./routes/auth');
//rotas de middleware
app.use('/api/user', authRoute);

const PORT = 3737;

app.listen(PORT, () =>{
    console.log(`O servidor está rodando na porta: ${PORT}`);
});