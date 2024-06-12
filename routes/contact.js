const express = require('express');
const { sendMail } = require('../sendMail/sendMail');
const router = express.Router();

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await sendMail({ name, email, message });
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;