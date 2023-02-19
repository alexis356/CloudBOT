const {Client, ClientUser} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client){
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect){
            console.log('MongoDB Conection Successful')
        }

        console.log(`${client.user.username} is now online`);
    },
}