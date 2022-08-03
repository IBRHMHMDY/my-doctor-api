import JWT from 'jsonwebtoken';
import models from '../models';

const isLoggedIn = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            return res.status(400).json({
                message: "رمز الدخول غير متوفر"
            });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.currentUser = decoded;
        next();


    } catch (e) {
        return res.status(500).json(e.message);
    }
}

export default isLoggedIn;