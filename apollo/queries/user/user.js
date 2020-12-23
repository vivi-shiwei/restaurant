import { AuthenticationError, UserInputError } from 'apollo-server-micro'

module.exports = (_, _args, _context = {}, _info) => {
  const { currentUser } = _context

  try {
    if (!currentUser) {
      throw new AuthenticationError(
        'Authentication token is invalid, please log in'
      )
    }
  } catch (err) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in'
    )
  }

  return currentUser
}
