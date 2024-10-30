const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');


exports.getProject = async (req, res) => {
    try {
        const projects = await getRequest(`/projects`);
        res.render('tables/project', { projects });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.formProject = async (req, res) => {
    try {
        res.render('forms/create_project');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
exports.createProject = async (req, res) => {
    try {
        console.log(req.body)
        // const response = await postRequest('/project', req.body);
        res.render('forms/create_project');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
exports.editProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await getRequest(`/project/${id}`);
        console.log(project)
        res.render('forms/edit_project', { project });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

