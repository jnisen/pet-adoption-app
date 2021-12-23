const bycript = require('bcrypt')

export function encryptPassword(req, res, next) {

    const { password } = req.body

    const saltRounds = 10;

    bycript.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).send('Error Encrypting')
            return
        }
        req.body.password = hash
        req.body.confirmPassword = hash
        next()
    })

}

export function isPasswordTwice(req, res, next) {
    try {
        const { password, confirmPassword } = req.body
        if (password !== confirmPassword) res.status(400).send('Password Not Matches')
        else next()
    } catch (e) {
        console.log(e)
    }
}