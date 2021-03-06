const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {

            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({message: "Не авторизован в Чек"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            {
                if (!role.includes(decoded.role)) {
                    return res.status(403).json({message: `Нет доступа\nYour role is ${decoded.role}`})
                }
            }

            req.user = decoded;
            next()
        } catch (e) {
            console.log(e)
            res.status(401).json({message: "ошибкаНе авторизован в Чек"})
        }
    };
}



