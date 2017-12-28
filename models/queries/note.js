const Note = require('../../models/Note');
const ObjectId = require('mongodb').ObjectID;

let add = exports.add = note => {
    const newNote = new Note(note);

    return new Promise((resolve, reject) => {
        newNote.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

let get = exports.get = (userId, plantNumber) => {
    return new Promise((resolve, reject) => {
        Note.find({
            userId: ObjectId(userId),
            plantNumber: plantNumber
        }).exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

let remove = exports.remove = (note) => {
    return new Promise((resolve, reject) => {
        Note.find({
            _id: ObjectId(note._id),
            userId: note.userId
        }).remove().exec((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}