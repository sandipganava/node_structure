const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String, // e.g., "Beginner", "Intermediate", "Advanced"
        required: true,
    },
    category: {
        type: String, // e.g.,  technical/soft
        required: true,
    },
    yearsOfExperience: {
        type: Number, // Number of years you have experience with this skill
        required: true,
    },
    description: {
        type: String, // Optional description of the skill
    },
    isFeatured: {
        type: Boolean,
        default: false, // Flag to indicate if the skill should be highlighted
    },
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
