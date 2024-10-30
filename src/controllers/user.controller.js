const { getRequest, postRequest, putRequest, deleteRequest } = require('../utils/apiHelper');



// dashbord (Admin-only)
exports.dashbord = async (req, res) => {
    try {

        res.render('index');
        // res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getform = async (req, res) => {
    try {
        res.render('forms/basic_elements');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.getTable = async (req, res) => {
    try {
        res.render('tables/basic_table');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.loginPost = async (req, res) => {
    try {
        // Call the API helper function to post login data
        const response = await postRequest('/login', req.body);

        // Check if there was an error in the response
        if (!response.status) {  // If status is false, there was an error
            return res.render('login', { error: response.message });  // Render login page with error message
        }
        // Store the token in session
        req.session.token = response.token;
        console.log('Token stored in session:', req.session.token);

        // If login was successful, render the appropriate view or redirect
        res.redirect('/');
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.render('login', { error: 'An unexpected error occurred' });
    }
};


