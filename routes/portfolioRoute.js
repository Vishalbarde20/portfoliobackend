const router = require('express').Router();
const {
    Intro,
    About,
    Experience,
    Project,
    Course,
} = require('../models/portfolioModel');
const User = require("../models/userModel");

// Utility to format date
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Get all portfolio data
router.get('/get-portfolio-data', async (req, res) => {
    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const projects = await Project.find();
        const experiences = await Experience.find();
        const courses = await Course.find();

        res.status(200).send({
            intro: intros[0],
            about: abouts[0],
            projects: projects,
            experiences: experiences,
            courses: courses,
        });

    } catch (error) {
        res.status(500).send(error);
    }
});

// Update intro
router.post("/update-intro", async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update About
router.post("/update-about", async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: about,
            success: true,
            message: "About updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add experience
router.post("/add-experience", async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update experience
router.post("/update-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete experience
router.post("/delete-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience delete successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add project
router.post("/add-project", async (req, res) => {
    try {
        const { title, image, description, createdBy, liveStatus, technologies } = req.body;

        // Create a new project instance
        const project = new Project({
            title,
            image,
            description,
            createdBy,
            liveStatus,
            technologies,
            createdDate: formatDate(new Date()) // Set the current date without time
        });

        // Save the project to the database
        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: "Project added successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error adding project',
            error: error.message,
        });
    }
});

// Update project
router.post("/update-project", async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete project
router.post("/delete-project", async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: project,
            success: true,
            message: "Project delete successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add course
router.post("/add-course", async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({
            data: course,
            success: true,
            message: "Course added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update course
router.post("/update-course", async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: course,
            success: true,
            message: "Course updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete course
router.post("/delete-course", async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: course,
            success: true,
            message: "Course delete successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Admin login
router.post("/admin-login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        user.password = "";
        if (user) {
            res.status(200).send({
                data: user,
                success: true,
                message: "Login Successfully"
            });
        } else {
            res.status(200).send({
                data: user,
                success: false,
                message: "Invalid username or password",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;