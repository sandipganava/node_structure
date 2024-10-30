const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');


exports.getExperience = async (req, res) => {
    try {
        const experiences = await getRequest(`/experiences`);
        res.render('tables/experience', { experiences });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.formExperience = async (req, res) => {
    try {
        res.render('forms/create_experience');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.createExperience = async (req, res) => {
    try {
        await postRequest(`/experiences`, req.body);
        res.redirect('/experiences');
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.editExperience = async (req, res) => {
    try {
        const experience = await getRequest(`/experience/${req.params.id}`);
        res.render('forms/edit_experience', { experience });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.updateExperience = async (req, res) => {
    try {
        await putRequest(`/experience/${req.params.id}`, req.body);
        res.redirect('/experiences');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}