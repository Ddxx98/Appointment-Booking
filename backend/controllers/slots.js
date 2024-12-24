const Slots = require('../models/slots')

module.exports.getSlots = async (req,res)=>{
    // Slots.findAll().then((user)=>{
    //     //console.log(user)
    //     res.json(user)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try {
        const slots = await Slots.findAll();
        res.json(slots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.' });
    }
}

module.exports.getUserByEmail = async (req,res)=>{
    // Slots.findAll({where: {email:req.params.email}}).then((user)=>{
    //     //console.log(user)
    //     res.json(user[0])
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try {
        const slots = await Slots.findAll({ where: { email: req.params.email } });
        res.json(slots[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.' });
    }
}

module.exports.createSlots = async (req,res)=>{
    const user = req.body.data
    // Slots.create({time:user.time,count:user.count}).then((slot)=>{
    //     //console.log(user.dataValues)
    //     res.json(slot.dataValues)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try {
        const slot = await Slots.create({ time: user.time, count: user.count });
        res.json(slot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.' });
    }
}

module.exports.deleteSlots = async (req,res)=>{
    // Slots.destroy({where:{id:req.params.id}}).then((slot)=>{
    //     //console.log(user)
    //     res.json(slot)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try {
        const slot = await Slots.destroy({ where: { id: req.params.id } });
        res.json(slot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.' });
    }
}

module.exports.editSlots = async (req,res)=>{
    const {count} = req.body
    // Slots.update({count:count},{where:{id:req.params.id}}).then((slot)=>{
    //     console.log(slot)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    try {
        const slot = await Slots.update({ count: count }, { where: { id: req.params.id } });
        res.json(slot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.' });
    }
}