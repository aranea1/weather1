const config = require('config');
const bcrypt = require('bcryptjs');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = Router();


/**
 * @swagger
 * 
 * /api/auth:
 *      get:
 *          summary: Token validation
 *          description: Use to check if the user token is valid
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *              - in: query
 *                name: params
 *                description: JWT token
 *                schema:
 *                  type: string
 *          responses:
 *            200:
 *              description: Successful validation
 *            401:
 *              description: Validation failed, token is malformed or expired
*/

router.get('/', auth, async (req, res) => {
    User.findById(req.user.userId, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const userData = {
            username: user.username,
            cities: user.cities,
            role: user.role,
        }
        res.status(200).json(JSON.stringify(userData));
    });

});


/**
 * @swagger
 * 
 * /api/auth/register:
 *      post:
 *          summary: Registration
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *            - in: body
 *              name: Credentials
 *              description: json with username and password
 *              schema:
 *                  username:
 *                      type: string
 *                  password: 
 *                      type: string 
 *          responses:
 *            201:
 *              description: Successful registration
 *            400:
 *              description: Inappropriate credentials
 *            500:
 *              description: Server error
*/

router.post(
    '/register',
    [
        check('username', 'Username min length is 4.').isLength({ min: 4 }),
        check('password', 'Password min length is 6.').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({ message: 'User already exists.' })
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword, role: 0 });

            await user.save();
            res.status(201).json({ message: 'User created.' });

        } catch (e) {
            res.status(500).json({ message: 'Error while registration.' });
            console.log(e);
        }
    }
);


/**
 * @swagger
 * 
 * /api/auth/login:
 *      post:
 *          summary: Authentication
 *          description: Use to logging in user
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *            - in: body
 *              name: Credentials
 *              description: json with username and password
 *              schema:
 *                  username:
 *                      type: string
 *                  password: 
 *                      type: string 
 *              
 *          responses:
 *            200:
 *              description: Successful authentication
 *            400:
 *              description: Inappropriate credentials
 *            500:
 *              description: Server error
*/

router.post(
    '/login',
    [
        check('username', 'Enter your username.').exists(),
        check('password', 'Enter your password.').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Incorrect credentials.' })
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect credentials.' })
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role,
                },
                config.get('jwtSecret'),
                { expiresIn: '3h' }
            );

            res.status(200).json({
                token,
                username: user.username,
                cities: user.cities,
                role: user.role,
            });

        } catch (e) {
            console.log(e.message);
            res.status(500).json({ message: 'Error while login in.' });
        }

    }
);

module.exports = router;
