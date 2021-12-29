import { Users, User } from '../data/usersDb'
const users = new Users()
const { validationResult } = require('express-validator')

export function validationSchema(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next()
}


export async function validationUserUpdate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { idUser } = req.body
    const user: any = await users.getUserPetsById(idUser)
    if (errors.array()[0].value === user.user.password) {
      next()
    } else {
      if (errors.array()[0].param === 'password' && (errors.array()[0].value.length === 0 || errors.array()[0].value === undefined)) {
        next()
      } else return res.status(400).send({ errors: errors.array() });
    }

  } else {
    next()
  }

}