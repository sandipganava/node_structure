
const apicontroller = {};
const User = require('../models/user.model');
const Project = require('../models/project.model');
const Blog = require('../models/blog.model');
const Contact = require('../models/contact.model');
const Education = require('../models/education.model');
const Experience = require('../models/experience.model');
const Skill = require('../models/skill.model');
const Social = require('../models/socialMedia.model');
const Testimonial = require('../models/testimonial.model');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// apicontroller.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// apicontroller.addUsers = async (req, res) => {
//   const user = new User({
//     fullname: req.body.fullname,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json({ status: true, message: 'User added successfully!' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// apicontroller.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json({ status: true, data: user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// apicontroller.updateUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.fullname = req.body.fullname;
//     user.username = req.body.username;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     const updatedUser = await user.save();
//     res.status(200).json({ status: true, message: 'User updated successfully!', data: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// apicontroller.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const deletedUser = await user.remove();
//     res.status(200).json({ status: true, message: 'User deleted successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

apicontroller.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    // Step 1: Validate request data (email and password)
    if (!email || !password) {
      return res.status(400).json({ status: false, message: 'Email and password are required' });
    }

    // Step 2: Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Step 3: Compare the password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ status: false, message: 'Invalid credentials' });
    }

    // Step 4: Generate JWT Token for the authenticated user
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },  // Payload
      process.env.DEV_JWT_SECRET,  // Secret key
      { expiresIn: '1h' }  // Token expiration (optional)
    );

    // Step 5: Return success response with token
    res.status(200).json({
      status: true,
      message: 'User logged in successfully!',
      token,  // Include the JWT token in the response
    });

  } catch (error) {
    // Catch any errors and return a 500 response
    res.status(500).json({ status: false, message: error.message });
  }
};

apicontroller.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ deletedAt: null });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addProjects = async (req, res) => {

  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file.path,
      liveLink: req.body.liveLink,
      technologies: req.body.technologies,
      category: req.body.category,
      githubLink: req.body.github,
      isFeatured: req.body.isFeatured
    });
    const newProject = await project.save();
    res.status(201).json({ status: true, message: 'Project added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({ status: true, data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ status: false, message: 'Project not found.' });
    }
    project.title = req.body.title;
    project.description = req.body.description;
    project.imageUrl = req.file ? req.file.path : project.imageUrl;
    project.liveLink = req.body.liveLink;
    project.technologies = req.body.technologies;
    project.category = req.body.category;
    project.githubLink = req.body.githubLink;
    project.isFeatured = req.body.isFeatured;

    const updatedProject = await project.save();
    res.status(200).json({ status: true, message: 'Project updated successfully!', data: updatedProject });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { deletedAt: Date.now() });
    res.status(200).json({ status: true, message: 'Project deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addBlogs = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file.path,
      category: req.body.category,
      tags: req.body.tags,
      author: req.body.author,
      isPublished: req.body.isPublished
    });
    const newBlog = await blog.save();
    res.status(201).json({ status: true, message: 'Blog added successfully!' });

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({ status: true, data: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateBlog = async (req, res) => {
  try {
    console.log("ss", req.body);
    const blog = await Blog.findById(req.params.id);
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.imageUrl = req.file ? req.file.path : blog.imageUrl;
    blog.category = req.body.category;
    blog.tags = req.body.tags;
    blog.author = req.body.author;
    blog.isPublished = req.body.isPublished;
    const updatedBlog = await blog.save();
    res.status(200).json({ status: true, message: 'Blog updated successfully!', data: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { deletedAt: Date.now() });
    const deletedBlog = await blog.remove();
    res.status(200).json({ status: true, message: 'Blog deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addContacts = async (req, res) => {
  try {
    const contact = new Contact({
      fullname: req.body.fullname,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      isResponded: req.body.isResponded
    });
    const newContact = await contact.save();
    res.status(201).json({ status: true, message: 'Contact added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json({ status: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    contact.isResponded = req.body.isResponded;
    const updatedContact = await contact.save();
    res.status(200).json({ status: true, message: 'Contact updated successfully!', data: updatedContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { deletedAt: Date.now() });
    res.status(200).json({ status: true, message: 'Contact deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addEducations = async (req, res) => {
  try {
    const education = new Education({
      institution: req.body.institution,
      degree: req.body.degree,
      fieldOfStudy: req.body.fieldOfStudy,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      grade: req.body.grade,
      activities: req.body.activities,
      description: req.body.description,
      honors: req.body.honors,
      location: req.body.location
    });
    const newEducation = await education.save();
    res.status(201).json({ status: true, message: 'Education added successfully!' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    res.status(200).json({ status: true, data: education });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    education.institution = req.body.institution;
    education.degree = req.body.degree;
    education.fieldOfStudy = req.body.fieldOfStudy;
    education.startYear = req.body.startYear;
    education.endYear = req.body.endYear;
    education.grade = req.body.grade;
    education.activities = req.body.activities;
    education.description = req.body.description;
    education.honors = req.body.honors;
    education.location = req.body.location;
    const updatedEducation = await education.save();
    res.status(200).json({ status: true, message: 'Education updated successfully!', data: updatedEducation });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

apicontroller.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id, { deletedAt: Date.now() });
    res.status(200).json({ status: true, message: 'Education deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addExperiences = async (req, res) => {
  try {
    const experience = new Experience({
      company: req.body.company,
      jobTitle: req.body.jobTitle,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      location: req.body.location,
      responsibilities: req.body.responsibilities,
      achievements: req.body.achievements,
      isCurrent: req.body.isCurrent
    });
    const newExperience = await experience.save();
    res.status(201).json({ status: true, message: 'Experience added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    res.status(200).json({ status: true, data: experience });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    experience.company = req.body.company;
    experience.jobTitle = req.body.jobTitle;
    experience.startDate = req.body.startDate;
    experience.endDate = req.body.endDate;
    experience.description = req.body.description;
    experience.location = req.body.location;
    experience.responsibilities = req.body.responsibilities;
    experience.achievements = req.body.achievements;
    experience.isCurrent = req.body.isCurrent;
    const updatedExperience = await experience.save();
    res.status(200).json({ status: true, message: 'Experience updated successfully!', data: updatedExperience });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id, { deletedAt: Date.now() });
    res.status(200).json({ status: true, message: 'Experience deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addSkills = async (req, res) => {
  try {
    const skill = new Skill({
      name: req.body.name,
      level: req.body.level,
      category: req.body.category,
      yearsOfExperience: req.body.yearsOfExperience,
      description: req.body.description,
      isFeatured: req.body.isFeatured
    });
    const newSkill = await skill.save();
    res.status(201).json({ status: true, message: 'Skill added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    res.status(200).json({ status: true, data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    skill.name = req.body.name;
    skill.level = req.body.level;
    skill.category = req.body.category;
    skill.yearsOfExperience = req.body.yearsOfExperience;
    skill.description = req.body.description;
    skill.isFeatured = req.body.isFeatured;
    const updatedSkill = await skill.save();
    res.status(200).json({ status: true, message: 'Skill updated successfully!', data: updatedSkill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id, { deletedAt: Date.now() });
    res.status(200).json({ status: true, message: 'Skill deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllSocials = async (req, res) => {
  try {
    const socials = await Social.find();
    res.status(200).json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addSocials = async (req, res) => {
  try {
    const social = new Social({
      username: req.body.username,
      platform: req.body.platform,
      icon: req.body.icon,
      link: req.body.link,
      isVisible: req.body.isVisible
    });
    const newSocial = await social.save();
    res.status(201).json({ status: true, message: 'Social added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getSocial = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);
    res.status(200).json({ status: true, data: social });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateSocial = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);
    social.username = req.body.username;
    social.platform = req.body.platform;
    social.icon = req.body.icon;
    social.link = req.body.link;
    social.isVisible = req.body.isVisible;
    const updatedSocial = await social.save();
    res.status(200).json({ status: true, message: 'Social updated successfully!', data: updatedSocial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteSocial = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id, { deletedAt: Date.now() });
    res.status(200).json({ status: true, message: 'Social deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.addTestimonials = async (req, res) => {
  try {
    const testimonial = new Testimonial({
      name: req.body.name,
      message: req.body.message,
      designation: req.body.designation,
      imageUrl: req.file.path,
      isFeatured: req.body.isFeatured,
      company: req.body.company,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured
    });
    const newTestimonial = await testimonial.save();
    res.status(201).json({ status: true, message: 'Testimonial added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    res.status(200).json({ status: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    testimonial.name = req.body.name;
    testimonial.message = req.body.message;
    testimonial.designation = req.body.designation;
    testimonial.imageUrl = req.file ? req.file.path : testimonial.imageUrl;
    testimonial.isFeatured = req.body.isFeatured;
    const updatedTestimonial = await testimonial.save();
    res.status(200).json({ status: true, message: 'Testimonial updated successfully!', data: updatedTestimonial });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

apicontroller.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id, { deletedAt: Date.now() });
    res.status(200).json({ status: true, message: 'Testimonial deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const recoverData = async () => {
  try {
    const dirPath = path.join(__dirname, 'backdata');
    const userFilePath = path.join(dirPath, 'user.json');
    const blogFilePath = path.join(dirPath, 'blog.json');
    const contactFilePath = path.join(dirPath, 'contact.json');
    const educationFilePath = path.join(dirPath, 'education.json');
    const experienceFilePath = path.join(dirPath, 'experience.json');
    const projectFilePath = path.join(dirPath, 'project.json');
    const skillFilePath = path.join(dirPath, 'skill.json');
    const socialFilePath = path.join(dirPath, 'social.json');
    const testimonialFilePath = path.join(dirPath, 'testimonial.json');

    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    // Fetch data from all .models
    const users = await User.find();
    const blogs = await Blog.find();
    const contacts = await Contact.find();
    const educations = await Education.find(); // Assuming Education models exists
    const experiences = await Experience.find(); // Assuming Experience models exists
    const projects = await Project.find(); // Assuming Project models exists
    const skills = await Skill.find(); // Assuming Skill models exists
    const socials = await Social.find(); // Assuming Social models exists
    const testimonials = await Testimonial.find(); // Assuming Testimonial models exists

    // Convert data to JSON strings
    const userData = JSON.stringify(users, null, 2);
    const blogData = JSON.stringify(blogs, null, 2);
    const contactData = JSON.stringify(contacts, null, 2);
    const educationData = JSON.stringify(educations, null, 2);
    const experienceData = JSON.stringify(experiences, null, 2);
    const projectData = JSON.stringify(projects, null, 2);
    const skillData = JSON.stringify(skills, null, 2);
    const socialData = JSON.stringify(socials, null, 2);
    const testimonialData = JSON.stringify(testimonials, null, 2);

    // Write data to respective JSON files
    fs.writeFileSync(userFilePath, userData);
    fs.writeFileSync(blogFilePath, blogData);
    fs.writeFileSync(contactFilePath, contactData);
    fs.writeFileSync(educationFilePath, educationData);
    fs.writeFileSync(experienceFilePath, experienceData);
    fs.writeFileSync(projectFilePath, projectData);
    fs.writeFileSync(skillFilePath, skillData);
    fs.writeFileSync(socialFilePath, socialData);
    fs.writeFileSync(testimonialFilePath, testimonialData);

    console.log('Data saved successfully in backdata folder!');
    return true;
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while saving data.'); // Adjust error handling as needed
  }
};

// Set up a cron job to run every week (e.g., every Monday at midnight)
cron.schedule('0 0 * * 1', async () => {
  console.log('Running weekly task...');
  try {
    await recoverData();
  } catch (err) {
    console.error('Error running the weekly task:', err);
  }
});


apicontroller.fackData = async (req, res) => {
  try {
    for (let i = 0; i < 10; i++) {
      const user = new Testimonial(generateFakeTestimonialData());
      await user.save();
    }
    res.status(200).json({ status: true, message: 'Fake data added successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = apicontroller;
