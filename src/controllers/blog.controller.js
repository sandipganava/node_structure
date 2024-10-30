const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');


exports.getBlog = async (req, res) => {
    try {
        const blogs = await getRequest(`/blogs`);
        res.render('tables/blog', { blogs });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.formBlog = async (req, res) => {
    try {
        res.render('forms/create_blog');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.createBlog = async (req, res) => {
    try {
        await postRequest(`/blogs`, req.body);
        res.redirect('/blogs');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.editBlog = async (req, res) => {
    try {
        const blog = await getRequest(`/blog/${req.params.id}`);
        res.render('forms/edit_blog', { blog });
    }catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        await putRequest(`/blog/${req.params.id}`, req.body);
        res.redirect('/blogs');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}