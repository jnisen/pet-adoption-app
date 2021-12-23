import { Users, User } from '../data/usersDb'
const users = new Users()

export async function isAdmin(req, res, next) {
    const { userID } = req.user
    const findUser: any = await users.getUser(userID)
    try {
        if (findUser.role !== 'admin') throw ('You arent an Admin, not allowed to access this page')
        next()

    } catch (e) {
        res.status(403).json({ msg: `${e}` });
    }
}

export async function isPublic(req, res, next) {
    const { userID } = req.user
    const findUser: any = await users.getUser(userID)
    try {
        if (findUser.role !== 'public') throw ('You arent a public, not allowed to access this page')
        next()

    } catch (e) {
        res.status(403).json({ msg: `${e}` });
    }
}

