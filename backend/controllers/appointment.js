const Appointment = require('../models/appointment')

module.exports.getAppointments = async (req,res)=>{
    // Appointment.findAll().then((appointment)=>{
    //     //console.log(user)
    //     res.json(appointment)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try {
        const appointments = await Appointment.findAll();
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.' });
    }
}

module.exports.getUserByEmail = async(req,res)=>{
    // Appointment.findAll({where: {id:req.params.id}}).then((user)=>{
    //     //console.log(user)
    //     res.json(user[0])
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try {
        const user = await Appointment.findAll({where: {id:req.params.id}})
        res.json(user[0])
    } catch(err){
        res.status(500).json({message:'An error occurred'})
    }
}

module.exports.createAppointment = async (req,res)=>{
    const {name,email,slotId,time} = req.body
    // Appointment.create({name:name,email:email,slotId:slotId,time:time}).then((user)=>{
    //     //console.log(user.dataValues)
    //     res.json(user.dataValues)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try{
        const user = await Appointment.create({name:name,email:email,slotId:slotId,time:time})
        res.json(user.dataValues)
    }catch(err){
        res.status(500).json({message:'An error occurred'})
    }
}

module.exports.deleteAppointment = async (req,res)=>{
    // Appointment.destroy({where:{id:req.params.id}}).then((appointment)=>{
    //     //console.log(user)
    //     res.json(appointment)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try{
        const appointment = await Appointment.destroy({where:{id:req.params.id}})
        res.json(appointment)
    } catch(err){
        res.status(500).json({message:'An error occurred'})
    }
}

module.exports.editAppointment = async (req,res)=>{
    // Appointment.create({id:req.params.id}).then((appointment)=>{
    //     console.log(appointment)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try{
        const appointment = await Appointment.create({id:req.params.id})
        res.json(appointment)
    } catch(err){
        res.status(500).json({message:'An error occurred'})
    }
}