import rawCountriesJson from '../../data/countries.json'

interface CountryItem {
  name: string
  code: string
  nationalNumberLength: number
  cities: string[]
}

const CountriesData: CountryItem[] = rawCountriesJson as any

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/
const aadharRegex = /^[0-9]{12}$/
const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/
const nameRegex = /^[a-zA-Z\s]{2,50}$/
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/

export interface FormState {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  showPassword: boolean
  countryCode: string
  phone: string
  country: string
  city: string
  pan: string
  aadhar: string
}

export const validateField = (
  name: keyof FormState,
  value: string,
  form?: FormState
): string => {
  if (!value.trim()) return 'This field is required'

  switch (name) {
    case 'firstName':
    case 'lastName':
      if (value.length < 2 || value.length > 50)
        return 'Name must be between 2 and 50 characters'
      if (!nameRegex.test(value))
        return 'Name must contain only letters and spaces'
      break

    case 'username':
      if (!usernameRegex.test(value))
        return 'Username must be 4–20 characters and can include letters, numbers, and underscores'
      break

    case 'email':
      if (!emailRegex.test(value))
        return 'Please enter a valid email (e.g., user@example.com)'
      break

    case 'password':
      if (!strongPasswordRegex.test(value))
        return 'Password must be ≥8 chars, include upper/lowercase, a number, and a special character'
      break

    case 'phone': {
      if (!/^\d+$/.test(value))
        return 'Phone number must contain only digits'
      const countryObj = CountriesData.find(c => c.code === form?.countryCode)
      if (!countryObj)
        return 'Please select a country code first'
      if (value.length !== countryObj.nationalNumberLength)
        return `Phone number must be exactly ${countryObj.nationalNumberLength} digits for ${countryObj.name}`
      break
    }

    case 'pan':
      if (!panRegex.test(value))
        return 'PAN must be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)'
      break

    case 'aadhar':
      if (!aadharRegex.test(value))
        return 'Aadhar must be exactly 12 digits'
      break

    default:
      break
  }

  return ''
}
