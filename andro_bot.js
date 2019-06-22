/* DOCUMENTATION
 * Uses NodeJS and the discord.js module 
 * This is a bot made for helping members of our discord group. 
 * */


const Discord = require('discord.js');
var fs = require('fs');   // for file-handling of txt files with information
const { prefix, token, goals, desc } = require('./config.json')  // extracting private info from a json file
const client = new Discord.Client();

var help_file = fs.readFileSync("./help.txt", { "encoding": "utf-8" }); // creating a file object

client.once('ready', () => {    // to signal server that bot is ready for use once
    console.log('Ready!');
});

client.on('message', message => { 
    // below is the function to display resource based on a subject
    // messages are sent only to the user and not the whole group
    function choose_resource_subject(subject) {
        if (subject == 'js') {
            var js_resources = fs.readFileSync("./resources/jsRes.txt", { "encoding": "utf-8" });
            message.author.send('Here are some resources on Javascript:');
            message.author.send(js_resources);
        }
        else if (subject == 'java') {
            var java_resources = fs.readFileSync("./resources/javaRes.txt", { "encoding": "utf-8" });
            message.author.send('Here are some resources on Java:');
            message.author.send(java_resources);
        }
        else if (subject == 'kotlin') {
            var kotlin_resources = fs.readFileSync("./resources/kotlinRes.txt", { "encoding": "utf-8" });
            message.author.send('Here are some resources on Kotlin:');
            message.author.send(kotlin_resources);
        }
        else if (subject == 'android') {
            var android_resources = fs.readFileSync("./resources/androidRes.txt", { "encoding": "utf-8" });
            message.author.send('Here are some resources on Android Studio:');
            message.author.send(android_resources);
        }
        else if (subject == 'html') {
            var html_resources = fs.readFileSync("./resources/htmlRes.txt", { "encoding": "utf-8" });
            message.author.send('Here are some resources on HTML:');
            message.author.send(html_resources);
        }
        else if (subject == 'css') {
            var css_resources = fs.readFileSync("./resources/cssRes.txt", { "encoding": "utf-8" });
            message.author.send('Here are some resources on CSS:');
            message.author.send(css_resources);
        }
    }
    // if the message does not start with prefix or it was sent by a bot or if the message was not sent in #bot-spam channel,
    // the bot will ignore the command.
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.name != "bot-spam") return;
    
    const args = message.content.slice(prefix.length).split(' ');   // separating the message and prefix
    const command = args.shift().toLowerCase();     // getting the command from array of message
    
    if (command == 'help') {
        message.author.send(help_file);
    }
    else if (command == 'goals') {
        message.channel.send(`${goals}`);
    }
    else if (command.startsWith('resources')) {
        var sub = command.split('-')[1];
        choose_resource_subject(sub);
    }
    else if (command == 'details') {
        if (message.guild != null) {
            message.author.send(`Server Name: ${message.guild.name}\n
Server Description: ${desc} \n
Total Members: ${message.guild.memberCount - 1}\n
DOB of server: ${message.guild.createdAt}\n
You joined on: ${message.guild.joinedAt}`);
        }
    }
});

client.login(token);
