

const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const csrf = require('csurf');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();
const apiController = require('../controllers/apiController');

// Apply security middlewares
const csrfProtection = csrf({ cookie: true });
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(process.env.ACCESS_TOKEN_SECRET === token);
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err, user);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


router.use(limiter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    return mimetype ? cb(null, true) : cb(new Error('Invalid file type!'));
  },
});

function checkKey() {
  return (req, res, next) => {
    const API_KEY = process.env.API_KEY;
    const x_api_key = req.headers['x-api-key'];
    console.log(x_api_key === API_KEY)
    if (x_api_key === API_KEY) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }

  }
}


// user Api
router.post('/login', apiController.adminLogin);
// router.get('/users', apiController.getAllUsers);
// router.post('/user', apiController.addUsers);
// router.get('/user/:id', apiController.getUser);
// router.put('/user/:id', apiController.updateUser);
// router.delete('/user/:id', apiController.deleteUser);

// project api
router.get('/projects', apiController.getAllProjects);
router.post('/project', upload.single('image'), apiController.addProjects);
router.get('/project/:id', apiController.getProject);
router.put('/project/:id', upload.single('image'), apiController.updateProject);
router.delete('/project/:id', apiController.deleteProject);

// blog api
router.get('/blogs', apiController.getAllBlogs);
router.post('/blog', upload.single('image'), apiController.addBlogs);
router.get('/blog/:id', upload.single('image'), apiController.getBlog);
router.put('/blog/:id', apiController.updateBlog);
router.delete('/blog/:id', apiController.deleteBlog);

// contact api
router.get('/contacts', apiController.getAllContacts);
router.post('/contact', apiController.addContacts);
router.get('/contact/:id', apiController.getContact);
router.put('/contact/:id', apiController.updateContact);
router.delete('/contact/:id', apiController.deleteContact);

// education api
router.get('/educations', apiController.getAllEducations);
router.post('/education', apiController.addEducations);
router.get('/education/:id', apiController.getEducation);
router.put('/education/:id', apiController.updateEducation);
router.delete('/education/:id', apiController.deleteEducation);

// experience api
router.get('/experiences', apiController.getAllExperiences);
router.post('/experience', apiController.addExperiences);
router.get('/experience/:id', apiController.getExperience);
router.put('/experience/:id', apiController.updateExperience);
router.delete('/experience/:id', apiController.deleteExperience);

// skill api
router.get('/skills', apiController.getAllSkills);
router.post('/skill', apiController.addSkills);
router.get('/skill/:id', apiController.getSkill);
router.put('/skill/:id', apiController.updateSkill);
router.delete('/skill/:id', apiController.deleteSkill);

// social api
router.get('/socials', apiController.getAllSocials);
router.post('/social', apiController.addSocials);
router.get('/social/:id', apiController.getSocial);
router.put('/social/:id', apiController.updateSocial);
router.delete('/social/:id', apiController.deleteSocial);

// testimonial api
router.get('/testimonials', apiController.getAllTestimonials);
router.post('/testimonial', upload.single('image'), apiController.addTestimonials);
router.get('/testimonial/:id', apiController.getTestimonial);
router.put('/testimonial/:id', upload.single('image'), apiController.updateTestimonial);
router.delete('/testimonial/:id', apiController.deleteTestimonial);

router.get('/fake', apiController.fackData);

module.exports = router;
