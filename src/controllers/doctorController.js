import Sequelize, { Op } from 'sequelize';
import models from '../models';

// Op = Operator
const op = Sequelize.Op;

export const index = async (req, res) => {
    // q = Query Data From DB
    let {q} = req.query
    const searchQuery = q? {name: {[op.like]: `%${q.replace(' ','')}%`}}: {};

    try {
        const doctors = await models.User.findAll({
            where: {userType: 'doctor', ...searchQuery},
            include: [{model: models.Profile, as: "profile"}],
            attributes: {exclude: ['password']}
        });

        res.status(200).json(doctors);

    } catch (e) {
        res.status(500).json(e.message);
    }
    
}