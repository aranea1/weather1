const Router = require('express');
const { searchByName } = require('../utils/searchCity');

const router = Router();


/**
 * @swagger
 * 
 * /api/search/city:
 *      get:
 *          summary: Search city
 *          description: Use to search cities with appropriate names
 *          consumes:
 *              application/json
 *          produces:
 *              application/json
 *          parameters:
 *            - in: query
 *              name: q
 *              description: Name of the requested city
 *          responses:
 *             200:
 *                description: Array of the cities with matching names
 *             500:
 *                description: Server error
*/

router.get('/city', (req, res) => {
    const cityName = req.query.q;
    searchByName(cityName, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error while finding' });
        }
        else res.status(200).json(data);
    });
});

module.exports = router;
