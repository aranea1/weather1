const { Router } = require('express');
const User = require('../models/User');
const City = require('../models/City');
const auth = require('../middleware/auth');

const router = Router();

/**
 * @swagger
 * 
 * /api/:
 *      put:
 *          summary: City adding
 *          description: Use to add new city to user list
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *            - in: query
 *              name: params
 *              description: JWT token and city id
 *              schema:
 *                  token: 
 *                      type: string 
 *                  cityId: 
 *                      type: string      
 *          responses:
 *             201:
 *                description: Added successfully
 *             401:
 *                description: Validation failed, token is malformed or expired
 *             500:
 *                description: Server error
*/

router.patch('/', auth, (req, res) => {
   const cityId = req.body.cityId;
   City.findByCityIdOrCreate({ cityId }, (err, _id) => {
      if (err || !_id) {
         res.status(500).json({ message: err.message });
      }
      if (_id) {
         User.findByIdAndUpdate(
            req.user.userId,
            {
               $addToSet: { cities: cityId, refCities: _id }
            },
            err => {
               if (err) {
                  console.log(err.message);
                  res.status(500).json({ message: err.message });
               }
               res.status(201).json({ ok: true, added: cityId });
            }
         );
      }
   });
});


/**
 * @swagger
 * 
 * /api/:
 *      delete:
 *          summary: City deleting
 *          description: Use to delete city from user list
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *            - in: query
 *              name: params
 *              description: JWT token and city id
 *              schema:
 *                  token: 
 *                      type: string 
 *                  cityId: 
 *                      type: string      
 *          responses:
 *             200:
 *                description: Deleted successfully
 *             401:
 *                description: Validation failed, token is malformed or expired
 *             404:
 *                description: Requested city was not found
 *             500:
 *                description: Server error
*/

router.delete('/', auth, (req, res) => {
   const cityId = req.query.cityId;
   City.findOne(
      { cityId },
      (err, city) => {
         if (err) {
            res.status(500).json({ message: err.message });
         }
         if (city) {
            User.findByIdAndUpdate(
               req.user.userId,
               {
                  $pull: { cities: city.cityId, refCities: city._id }
               },
               err => {
                  if (err) {
                     res.status(500).json({ message: 'User does not have this city in his list.' });
                  } else {
                     res.status(200).json({ ok: true, removed: cityId });
                  }
               }
            );
         } else {
            res.status(404).json({ message: 'City was not found' })
         }
      }
   )
});

module.exports = router;
