// ==========================================================================================================================================
// =================================================\ Note Taker - Homework 11 /=============================================================
// ==========================================================================================================================================

// -------------------------------------------------------\ Project Const /------------------------------------------------------------------

// IN
// modules to write to the db.json
const path = require('path');
const fs = require('fs');

// PORT
const PORT = process.env.PORT || 7000;

// Express modules to create the server
const express = require('express');
const app = express();

// Exp server
// Connect the backend to frontend
app.use(express.static(__dirname + '/public'));

// parse the data
app.use(express.urlencoded({ extended: true }));

// need in order to comunicate with the db.json
app.use(express.json());

// Path
const output_dir = path.resolve(__dirname, 'public');

// Saved Notes 
// gets the json file to the server
let savedN = require('./db/db.json');

// Generate ID
let ID = function () {
    return Math.random().toString(36).substr(2, 9);
};

// Write notes
function writeN() {

    // call back function at the end of the parameters 
    fs.writeFileSync('db/db.json', JSON.stringify(savedN), function (err) {

        // in case of error return error message in the console
        if (err) {
            return err;
        }

    });
};


