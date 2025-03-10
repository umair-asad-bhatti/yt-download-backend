const express = require('express');
const AUTH_CONTROLLER = require('../controller/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication APIs
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user with an encrypted password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Validation error or email already exists
 */
router.post('/signup', AUTH_CONTROLLER.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate user and return access & refresh tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access:
 *                   type: string
 *                   description: Access token
 *                   example: "eyJhbGciOiJIUz..."
 *                 refresh:
 *                   type: string
 *                   description: Refresh token
 *                   example: "eyJhbGciOiJIUz..."
 *       400:
 *         description: Invalid credentials or user not found
 */
router.post('/login', AUTH_CONTROLLER.login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     description: Generate a new access token using a valid refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh
 *             properties:
 *               refresh:
 *                 type: string
 *                 description: Refresh token
 *                 example: "your-refresh-token-here"
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access:
 *                   type: string
 *                   description: New access token
 *                   example: "eyJhbGciOiJIUz..."
 *                 refresh:
 *                   type: string
 *                   description: New refresh token
 *                   example: "eyJhbGciOiJIUz..."
 *       400:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh-token', AUTH_CONTROLLER.refreshToken);

module.exports = router;
