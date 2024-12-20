const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const sequelize = require('./util/database')
const appointmentRoutes = require('./routes/appointment');
const slotRoutes = require('./routes/slots');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/appointments',appointmentRoutes)
app.use('/slots',slotRoutes)

sequelize.sync()
    .then(result => {
        app.listen(3000, () => {
            //console.log(result)
            console.log("Server running in 3000")
        });
    })
    .catch(err => {
        console.log(err);
    });