const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');

exports.getTestimonial = async (req, res) => {
    try {
        const testimonials = await getRequest(`/testimonials`);
        res.render('tables/testimonial', { testimonials });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.formTestimonial = async (req, res) => {
    try {
        res.render('forms/create_testimonial');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.createTestimonial = async (req, res) => {
    try {
        await postRequest(`/testimonials`, req.body);
        res.redirect('/testimonials');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.editTestimonial = async (req, res) => {
    try {
        const testimonial = await getRequest(`/testimonial/${req.params.id}`);
        res.render('forms/edit_testimonial', { testimonial });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.updateTestimonial = async (req, res) => {
    try {
        await putRequest(`/testimonial/${req.params.id}`, req.body);
        res.redirect('/testimonials');
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
