const { Router } = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const dateWithoutTime = require('../utils/formatDate');

const router = Router();


/**
 * @swagger
 * 
 * /api/users/all:
 *      get:
 *          summary: Get all user
 *          description: Use to get list of all users
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *            - in: query
 *              name: params
 *              description: JWT token registration date range
 *              schema:
 *                  token: 
 *                      type: string
 *                  dateFrom:
 *                      type: string
 *                  dateTo:
 *                      type: string
 *          responses:
 *            200:
 *              description: Array of all users
 *            401:
 *              description: Either bad token or not authorized
 *            500:
 *              description: Server error
*/

router.get('/all', auth, (req, res) => {
   const { dateFrom, dateTo } = req.query;
   if (!req.user.role || req.user.role !== 'admin') res.status(401).json({ logout: true });
   if (dateFrom || dateTo) {
      const from = dateWithoutTime(dateFrom, 'from');
      const to = dateWithoutTime(dateTo, 'to');
      const condition = {};
      if (from) {
         condition['$gte'] = from;
      }
      if (to) {
         condition['$lte'] = to;
      }
      User.find(
         { createdAt: condition },
         ['username', 'createdAt'],
         (err, users) => {
            if (err) res.status(500).json({ message: 'Error while finding' });
            else {
               res.json({ users });
            }
         }
      );
   } else {
      User.find({}, ['username', 'createdAt'], (err, users) => {
         if (err) res.status(500).json({ message: 'Error while finding' });
         else {
            res.json({ users });
         }
      });
   }
});


/**
 * @swagger
 * 
 * /api/users/{userId}:
 *      get:
 *          summary: Get user
 *          description: Use to get info about user by his id
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *            - in: query
 *              name: params
 *              description: JWT token
 *              schema:
 *                  token: 
 *                      type: string 
 *            - in: path
 *              name: User id
 *              type: string
 *          responses:
 *            200:
 *              description: User was found
 *            401:
 *              description: Either bad token or not authorized
 *            500:
 *              description: Server error
*/

router.get('/id', auth, (req, res) => {
   const userId = req.query.userId;
   User.findById(req.user.userId, (err, user) => {
      if (err) {
         res.status(401).json({ logout: true });
      }
      if (!user.role || user.role !== 'admin') {
         res.status(401).json({ logout: true });
      }
      User.findById(userId)
         .populate('refCities', '-_id -__v')
         .exec()
         .then(user => {
            res.json({
               id: user._id,
               username: user.username,
               role: user.role,
               cities: user.refCities,
               createdAt: user.createdAt,
            });
         })
         .catch(error => {
            console.log(error.message);
            res.status(500).json({ message: error.message })
         });
   });
});

module.exports = router;
