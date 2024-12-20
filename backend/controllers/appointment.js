const Appointment = require('../models/appointment')

module.exports.getAppointments = (req,res)=>{
    Appointment.findAll().then((appointment)=>{
        //console.log(user)
        res.json(appointment)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.getUserByEmail = (req,res)=>{
    Appointment.findAll({where: {id:req.params.id}}).then((user)=>{
        //console.log(user)
        res.json(user[0])
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.createAppointment = (req,res)=>{
    const {name,email,slotId,time} = req.body
    Appointment.create({name:name,email:email,slotId:slotId,time:time}).then((user)=>{
        //console.log(user.dataValues)
        res.json(user.dataValues)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.deleteAppointment = (req,res)=>{
    Appointment.destroy({where:{id:req.params.id}}).then((appointment)=>{
        //console.log(user)
        res.json(appointment)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.editAppointment = (req,res)=>{
    Appointment.create({id:req.params.id}).then((appointment)=>{
        console.log(appointment)
    }).catch((err)=>{
        console.log(err)
    })
}