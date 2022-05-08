const {Router} = require('express');
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const {check} = require('express-validator');

const {validateJWT} = require('../middlewares/validate-jwt');
const {validate} = require('../middlewares/validate');
const {isDate} = require('../helpers/isDate');

const route = Router();
route.use(validateJWT);
//Get eventos
route.get('/', getEvents);
//Create event
route.post('/', 
        [
            check('title', 'El título es un campo obligatorio').not().isEmpty(),
            check('start', 'La fecha de inicio es un campo obligatorio').custom(isDate),
            check('end', 'La fecha de finalización obligatorio').custom(isDate),
            validate
        ]
    ,createEvent);
//Update event
route.put('/:id', updateEvent);
//Delete Event
route.delete('/:id', deleteEvent);




module.exports = route;