import { Users} from '../data/usersDb'

const users = new Users()
const bycript = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();

export async function createToken(req, res, next) {
    try {
        const { email, password } = req.body
        const findUser: any = await users.findUserByEmail(email)
        bycript.compare(password, findUser.password, function (err, result) {
            if (err) {
                res.status(404).send('Error Comparing')
            }
            if (result) {
                const payload = {
                    userID: findUser._id.toString(),
                }
                const token = jwt.sign(payload, 'process.env.SECRET_KEY')
                if (!req.cookies.token) {
                    res.cookie('token', token, { maxAge: 1000000 })
                    console.log('cookie created')

                }
                next()
               
            } else {
                res.status(404).send('Incorrect Password')
            }
        })

    } catch (e) {
        res.status(404).send(e.message)
    }

}