const { response } = require('express');
const Evento = require('../models/Evento');

const getEvents = async (req, res = response) => {

    const evento = await Evento.find().populate('user', 'name');

    return res.status(201).json({
        ok: true,
        msg: 'Events',
        evento
    })
}

const createEvent = async (req, res) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const savedEvent = await evento.save();

        return res.status(201).json({
            ok: true,
            msg: savedEvent
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Ha ocurrido un error, por favor, comuniquese con el administrador'
        })
    }
}

const updateEvent =  async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try{

        const evento = await Evento.findById(eventId);
        
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if(evento.user.toString()!==uid){
            return res.status(404).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, {new: true})

        return res.json({
            ok: true,
            evento: nuevoEvento
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, contacte con el administrador'
        })
    }

    return res.status(201).json({
        ok: true,
        msg: 'updateEvent'
    })
}

const deleteEvent = async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try{

        const event = await Evento.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(404).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            })
        }

        const eventToDelete = await Evento.findByIdAndDelete(eventId, );

        return res.json({
            ok: true,
            evento: eventToDelete
        })



    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, por favor, contacte al administrador'
        })
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}