const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || config.get('port');

const swaggerOptions = {
   swaggerDefinition: {
      info: {
         title: 'Weather App',
         description: 'CRUD application about weather.',
         version: '1.1.0',
         servers: [`http://localhost:${PORT}`]
      }
   },
   apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get('/', (req, res) => {
   res.send('index page');
});

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*"),
      res.header("Access-Control-Allow-Headers", "*"),
      next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api', require('./routes/changeCityList.routes'));
app.use('/api/users', require('./routes/getUsers.routes'));

if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'client', 'build')));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })
}

const start = async () => {
   try {
      await mongoose.connect(config.get('mongoUri'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      })
      app.listen(PORT, () => {
         console.log(`started at ${PORT}`);
      });
   } catch (e) {
      console.log('error in app', e.message);
      process.exit(1);
   }
}

start();
