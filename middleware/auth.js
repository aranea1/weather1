const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

   // if req method === OPTIONS return next()
   try {
      const token = req.body.token || req.query.token;
      if (!token) {
         return res.status(401).json({ message: 'Not authorized', logout: true });
      }
      const tokenInfo = jwt.verify(token, config.get('jwtSecret'));
      req.user = tokenInfo;
      next();

   } catch (e) {
      console.log(e.message);
      res.status(401).json({ message: 'Not authorized.', logout: true });
   }
}
