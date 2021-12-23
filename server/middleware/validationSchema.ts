const { validationResult } = require('express-validator')

export function validationUser(req, res, next) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next()
}

export function validationPet(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}

