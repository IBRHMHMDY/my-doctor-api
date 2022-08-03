const showValidationErrors = (req, res, next) => {
    const errs = req.validationErrors();
    if(errs){
        const errArray = errs.map(err => err.msg);
        return res.status(422).json({ message: errArray});
    }

    next();
}

const validate = fn => {
    return (req, res, next) => {
        fn(req, res);
        showValidationErrors(req, res, next)
    }
}

export default validate;