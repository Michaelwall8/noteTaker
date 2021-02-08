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

// -----------------------------------------------------\ Express Server Routes /----------------------------------------------------------

//   ----------------\ Pages Displays /------------------

// HTML Routes for the browser
// GET is getting the data from the data base and also the HTML pages 
// Homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(output_dir, 'index.html'));
});

// Notes page
app.get('/notes', function (req, res) {
    res.sendFile(path.join(output_dir, 'notes.html'));
});

// API route 
// Notes API 
app.get('/api/notes', function (req, res) {
    return res.json(savedN);
});

//  --------------\ Notes /-----------------

// POST is postting all the new notes coming from the front end into our API and JSON
// Post notes
app.post('/api/notes', function (req, res) {
    let note = req.body;

    // id Creator
    note.id = ID();
    // console.log(note.id);  // =================== Print command-line, ID check
    
    // push note
    savedN.push(note);

    // Overwrite
    writeN();

    return res.json(savedN);
});

// Deletes notes
app.delete("/api/notes/:id", function (req, res) {
    // ID .params.id = (grab specific id as apose to .body which grabs everything from API)
    let id = req.params.id; 
    
    // Loop saved notes array
    for (let i = 0; i < savedN.length; i++) {         
        if (savedN[i].id === id) {

            // Delete one note from array
            savedN.splice(i, 1);

            // Overwrite
            writeN();
            return res.json(savedN);
        }
    };
});

// ------------------------------------------------------\ PORT Listener /--------------------------------------------------------------------
app.listen(PORT, function () {
    console.log(`\x1b[96m>>> Listening at PORT: ${PORT}  <<<\x1b[39m`);
});

// ==========================================================================================================================================
// ===========================================================\ END /========================================================================
// ==========================================================================================================================================

