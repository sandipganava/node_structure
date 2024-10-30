const axios = require('axios');

// Create an Axios instance with default options
const apiHelper = axios.create({
    baseURL: 'http://localhost:3000/api',  // Default base URL for all requests
    timeout: 5000,  // Set a default timeout of 5 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
// General function to make GET requests
const getRequest = async (endpoint, headers = {}) => {
    try {
        const response = await apiHelper.get(endpoint, { headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// General function to make POST requests
const postRequest = async (endpoint, body = {}, headers = {}) => {
    try {
        const response = await apiHelper.post(endpoint, body, { headers });
        return response.data;  // Return data on success
    } catch (error) {
        // Return the error response
        if (error.response) {
            return error.response.data;  // Return the error message from the response
        } else {
            return { message: 'An unexpected error occurred' };
        }
    }
};

// General function to make PUT requests
const putRequest = async (endpoint, body = {}, headers = {}) => {
    try {
        const response = await apiHelper.put(endpoint, body, { headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// General function to make DELETE requests
const deleteRequest = async (endpoint, headers = {}) => {
    try {
        const response = await apiHelper.delete(endpoint, { headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error, res = null) => {
    if (error.response) {
        // Error from the server response
        console.error(`API Error: ${error.response.status} - ${error.response.data.message}`);
        
        // Optionally, send the error response if `res` is provided (for HTTP error responses)
        if (res) {
            res.status(error.response.status).json({ message: error.response.data.message });
        }
    } else if (error.request) {
        // No response received from the server
        console.error('API Error: No response received');
        
        if (res) {
            res.status(500).json({ message: 'No response received from the server' });
        }
    } else {
        // General errors or issues with request setup
        console.error(`Error: ${error.message}`);
        
        if (res) {
            res.status(500).json({ message: error.message });
        }
    }

    // Optionally throw error if you want to propagate it further
    // throw error;
};


module.exports = {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
};
