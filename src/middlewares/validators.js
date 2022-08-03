export const SaveUser = (req, res) => {
    req.checkBody('name')
        .notEmpty()
        .withMessage('الإسم مطلوب');

    req.checkBody('email')
    .notEmpty()
    .withMessage('البريد الإلكترونى مطلوب');

    req.checkBody('email')
    .isEmail()
    .withMessage('صيغة البريد الإلكترونى غير صحيحة');

    req.checkBody('password')
    .notEmpty()
    .withMessage('كلمة المرور مطلوبة');

    req.checkBody('userType')
    .notEmpty()
    .withMessage('نوع المستخدم مطلوب');
}
