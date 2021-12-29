import { Users, User } from '../data/usersDb'
const users = new Users()
const bycript = require('bcrypt')

export async function encryptPassword(req, res, next) {

    const { idUser, password } = req.body

    const saltRounds = 10;

    if (password.length === 0) {
        console.log('abdc')
        const user: any = await users.getUserPetsById(idUser)
        req.body.password = user.password
        req.body.confirmPassword = user.confirmPassword
        next()
    }

    if (password.length === 60) {
        req.body.password = password
        req.body.confirmPassword = password
        next()
    }

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