// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const skillController = require('../controllers/skill.controller');
const educationController = require('../controllers/education.controller');
const experienceController = require('../controllers/experience.controller');
const contactController = require('../controllers/contact.controller');
const socialController = require('../controllers/social.controller');
const testimonialController = require('../controllers/testimonial.controller');
const blogController = require('../controllers/blog.controller');
const authMiddleware = require('../middleware/auth.middleware');
const userValidator = require('../validators/user.validator');
const authenticateJWT = require('../middleware/authMiddleware');



router.get('/', authenticateJWT, userController.dashbord);
router.get('/login', userController.login);
router.post('/login', userController.loginPost);

router.get('/project', authenticateJWT, projectController.getProject);
router.get('/create_project', authenticateJWT, projectController.formProject);
router.post('/create_project', authenticateJWT, projectController.createProject);
router.get('/edit_project/:id', authenticateJWT, projectController.editProject);

router.get('/blog', authenticateJWT, blogController.getBlog);
router.get('/create_blog', authenticateJWT, blogController.formBlog);
router.post('/create_blog', authenticateJWT, blogController.createBlog);
router.get('/edit_blog/:id', authenticateJWT, blogController.editBlog);
router.post('/edit_blog/:id', authenticateJWT, blogController.updateBlog);

router.get('/education', authenticateJWT, educationController.getEducation);
router.get('/create_education', authenticateJWT, educationController.formEducation);
router.post('/create_education', authenticateJWT, educationController.createEducation);
router.get('/edit_education/:id', authenticateJWT, educationController.editEducation);
router.post('/edit_education/:id', authenticateJWT, educationController.updateEducation);


router.get('/experience', authenticateJWT, experienceController.getExperience);
router.get('/create_experience', authenticateJWT, experienceController.formExperience);
router.post('/create_experience', authenticateJWT, experienceController.createExperience);
router.get('/edit_experience/:id', authenticateJWT, experienceController.editExperience);
router.post('/edit_experience/:id', authenticateJWT, experienceController.updateExperience);


router.get('/skill', authenticateJWT, skillController.getSkill);
router.get('/create_skill', authenticateJWT, skillController.formSkill);
router.post('/create_skill', authenticateJWT, skillController.createSkill);
router.get('/edit_skill/:id', authenticateJWT, skillController.editSkill);
router.post('/edit_skill/:id', authenticateJWT, skillController.updateSkill);


router.get('/contact', contactController.getContact);

router.get('/social', authenticateJWT, socialController.getSocial);
router.get('/create_social', authenticateJWT, socialController.formSocial);
router.post('/create_social', authenticateJWT, socialController.createSocial);
router.get('/edit_social/:id', authenticateJWT, socialController.editSocial);
router.post('/edit_social/:id', authenticateJWT, socialController.updateSocial);

router.get('/testimonial', authenticateJWT, testimonialController.getTestimonial);
router.get('/create_testimonial', authenticateJWT, testimonialController.formTestimonial);
router.post('/create_testimonial', authenticateJWT, testimonialController.createTestimonial);
router.get('/edit_testimonial/:id', authenticateJWT, testimonialController.editTestimonial);
router.post('/edit_testimonial/:id', authenticateJWT, testimonialController.updateTestimonial);



// Route to get a specific user by ID
// router.get('/:id', authMiddleware.isAuthenticated, userController.getUserById);

// Route to create a new user (with validation)
// router.post(
//     '/', 
//     userValidator.validateUserCreation, // Middleware to validate user input
//     userController.createUser
// );

// Route to update an existing user
// router.put(
//     '/:id', 
//     authMiddleware.isAuthenticated, 
//     userValidator.validateUserUpdate, // Middleware to validate input
//     userController.updateUser
// );

// Route to delete a user by ID (Admin-only)
// router.delete('/:id', authMiddleware.isAdmin, userController.deleteUser);




module.exports = router;
