import express from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
import nodemailer from 'nodemailer';

const router = express.Router();

let inMemoryMessages = [];

const sendEmailNotification = async ({ name, email, subject, message }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log(`[Contact Form Received] From: ${name} (${email}) | Subject: ${subject}`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || 'damsaraninawela2002@gmail.com',
      replyTo: email,
      subject: `Portfolio Inquiry: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
  } catch (err) {
    console.warn('Could not send email notification:', err.message);
  }
};

// Public: Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    const messageData = {
      _id: new mongoose.Types.ObjectId().toString(),
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
      createdAt: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const newMessage = new Message(messageData);
        await newMessage.save();
      } catch (err) {
        console.warn('DB save message error:', err.message);
      }
    }

    inMemoryMessages.unshift(messageData);
    sendEmailNotification({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. I will get back to you soon.',
    });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

export default router;
