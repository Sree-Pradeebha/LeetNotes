import Note from "../models/Note.js";

// CREATE
export const createNote = async (req, res) => {

    try {

        const existingNote = await Note.findOne({
            questionNumber: req.body.questionNumber,
        });

        if (existingNote) {
            return res.status(400).json({
                message: "Question number already exists.",
            });
        }

        const note = await Note.create(req.body);

        res.status(201).json(note);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

// GET ALL
export const getNotes = async (req, res) => {

    try {

        const notes = await Note.find().sort({
            questionNumber: 1,
        });

        res.json(notes);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

// GET ONE
export const getNote = async (req, res) => {

    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found.",
            });
        }

        res.json(note);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

// UPDATE
export const updateNote = async (req, res) => {

    try {

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.json(note);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

// DELETE
export const deleteNote = async (req, res) => {

    try {

        await Note.findByIdAndDelete(req.params.id);

        res.json({
            message: "Note deleted successfully.",
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};