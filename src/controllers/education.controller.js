const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');

exports.getEducation = async (req, res) => {
    try {
        const educations = await getRequest(`/educations`);
        res.render('tables/education', { educations });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.formEducation = async (req, res) => {
    try {
        res.render('forms/create_education');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.createEducation = async (req, res) => {
    try {
        await postRequest(`/educations`, req.body);
        res.redirect('/education');
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.editEducation = async (req, res) => {
    try {
        const education = await getRequest(`/education/${req.params.id}`);
        res.render('forms/edit_education', { education });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.updateEducation = async (req, res) => {
    try {
        await putRequest(`/education/${req.params.id}`, req.body);
        res.redirect('/education');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}