import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
    language: {
        type: String,
        default: "python",
    },

    tc: String,
    sc: String,

    customTC: String,
    customSC: String,

    solution: String,
});

const noteSchema = new mongoose.Schema({

    questionNumber: {
        type: String,
        required: true,
        unique: true,
    },

    questionName: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        default: "",
    },

    personalNotes: {
        type: String,
        default: "",
    },

    isStarred: {
        type: Boolean,
        default: false,
    },

    difficulty: {
        type: String,
        default: "",
    },

    status: {
        type: String,
        default: "incomplete",
    },

    revisionImportance: {
        type: String,
        default: "Low",
    },

    topics: {
        type: [String],
        default: [],
    },

    bruteForce: {
        type: solutionSchema,
        default: () => ({}),
    },

    optimal: {
        type: solutionSchema,
        default: () => ({}),
    },

}, {
    timestamps: true,
});

export default mongoose.model("Note", noteSchema);