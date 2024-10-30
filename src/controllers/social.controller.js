const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');

exports.getSocial = async (req, res) => {
    try {
        const socials = await getRequest(`/socials`);
        res.render('tables/social', { socials });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.formSocial = async (req, res) => {
    try {
        res.render('forms/create_social');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.createSocial = async (req, res) => {
    try {
        await postRequest(`/socials`, req.body);
        res.redirect('/socials');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.editSocial = async (req, res) => {
    try {
        const social = await getRequest(`/social/${req.params.id}`);
        res.render('forms/edit_social', { social });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.updateSocial = async (req, res) => {
    try {
        await putRequest(`/social/${req.params.id}`, req.body);
        res.redirect('/socials');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

