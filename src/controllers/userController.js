import bcrypt from 'bcryptjs';
import models from '../models';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password, userType, location, specialization, address, workingHours, phone } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await models.User.create({
            name,
            email,
            password: hashPassword,
            userType,
            latitude: location.latitude,
            longitude: location.longitude,
        });

        if(userType == 'doctor'){
            const Profile = await models.Profile.create({
                userId: user.id,
                specialization,
                address,
                workingHours,
                phone
            });
        }

        return res.status(200).json({ message: "تم إنشاء حسابك بنجاح"})

    } catch (e) {
        console.log(e);
        return res.status(500).json(e.message);
    }
}


export const login = async (req, res, next) => {
    const { email, password} = req.body
    try {
        const user = await models.User.findOne({where: {email}});

        if(!user){
            return res.status(401).json({
                message: "كلمة المرور أو البريد الإلكترونى غير صحيحين"
            });
        }

        const authSuccess = await bcrypt.compare(password, user.password);

        if(authSuccess){
            const token = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET);
            console.log(res.status(200).json({accessToken: token}));
        }

    } catch (e) {
        return res.status(500).json(e);
    }
}

export const me = (req, res) => {
    const user = req.currentUser;
    return res.json(user);
}

export const getProfile = async (req, res, next) => {
    try {
        const result = await models.User.findOne({
            where: {id: req.currentUser.id},
            include: [{model: models.Profile, as: "profile"}],
            attributes: {exclude: ['password']}
        });

        return res.status(200).json(result);

    } catch (e) {
        return res.status(500).json(e);
    }
}