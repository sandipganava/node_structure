const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');


exports.getContact = async (req, res) => {
    try {
        const contacts = await getRequest(`/contacts`);
        res.render('tables/contact', { contacts });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}