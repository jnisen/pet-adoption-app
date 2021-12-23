import { Users } from '../data/usersDb'
const users = new Users()

export async function isUserExist(req, res, next) {

    const findUser: any = await users.findUserByEmail(req.body.email)
    if (findUser) {
        if (findUser.email === req.body.email && findUser._id.toString() === req.body.idUser) {
            next()
        }
        else res.status(400).send('User Already exists')
    }
    else next()




}

export async function isUserExistCreated(req, res, next) {
    const { email } = req.body
    const findUser: any = await users.findUserByEmail(email)
    if (findUser) next()
    else res.status(400).send('Unknow User on DB, please signup')
}