const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');

exports.getSkill = async (req, res) => {
    try {
        const skills = await getRequest(`/skills`);
        res.render('tables/skill', { skills });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.formSkill = async (req, res) => {
    try {
        res.render('forms/create_skill');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.createSkill = async (req, res) => {
    try {
        await postRequest(`/skills`, req.body);
        res.redirect('/skills');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.editSkill = async (req, res) => {
    try {
        const skill = await getRequest(`/skill/${req.params.id}`);
        res.render('forms/edit_skill', { skill });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.updateSkill = async (req, res) => {
    try {
        await putRequest(`/skill/${req.params.id}`, req.body);
        res.redirect('/skills');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.deleteSkill = async (req, res) => {
    try {
        await deleteRequest(`/skill/${req.params.id}`);
        res.redirect('/skills');
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}