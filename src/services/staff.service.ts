import _ from 'lodash'
import validateEmail from '../helpers/validateEmail'

interface TeacherDTO {
  firstName: String
  lastName: String
}

export const generateStaffEmail = async (data: TeacherDTO) => {
  const firstName = data?.firstName?.toLowerCase()
  const lastName = data?.lastName?.toLowerCase()
  let generatedEmail = `${firstName}.${lastName}@upgrade.edu`
  const validEmail = await validateEmail(generatedEmail)
  if (validEmail) return generatedEmail
  else {
    const randomKey = _.random(1, 20, false)
    generatedEmail = `${firstName}.${lastName}${randomKey}@upgrade.edu`
    return generatedEmail
  }
}
