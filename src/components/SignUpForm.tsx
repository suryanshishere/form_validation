import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../shared/form/InputField'
import SelectField, { SelectOption } from '../shared/form/SelectField'
import PasswordField from '../shared/form/PasswordField'
import { validateField, FormState } from '../shared/utils/validators'
import rawCountriesJson from '../data/countries.json'

interface CountryItem {
  name: string
  code: string
  nationalNumberLength: number
  cities: string[]
}

const CountriesData: CountryItem[] = rawCountriesJson as any

const SignUpForm: React.FC = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    countryCode: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  })

  const [errors, setErrors] = useState<{ [K in keyof FormState]?: string }>({})
  const [touched, setTouched] = useState<{ [K in keyof FormState]?: boolean }>({})

  const isValid =
    Object.values(errors).every(e => !e) &&
    (Object.entries(form) as [keyof FormState, any][])
      .filter(([k]) => k !== 'showPassword')
      .every(([, v]) => v !== '')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    const val = type === 'checkbox' ? checked : value
    setForm(prev => ({ ...prev, [name]: val }))

    if (touched[name as keyof FormState]) {
      const error = validateField(
        name as keyof FormState,
        typeof val === 'string' ? val : '',
        { ...form, [name]: val }
      )
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(
      name as keyof FormState,
      value,
      form
    )
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [K in keyof FormState]?: string } = {}
    for (const key of Object.keys(form) as (keyof FormState)[]) {
      if (key === 'showPassword') continue
      newErrors[key] = validateField(key, form[key] as string, form)
    }
    setErrors(newErrors)
    setTouched(
      Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    )
    if (Object.values(newErrors).every(e => !e)) {
      navigate('/success', { state: form })
    }
  }

  const codeOptions: SelectOption[] = CountriesData.map(c => ({
    label: `${c.name} (${c.code})`,
    value: c.code
  }))
  const countryOptions: SelectOption[] = CountriesData.map(c => ({
    label: c.name,
    value: c.name
  }))
  const selectedCountry = CountriesData.find(c => c.name === form.country)
  const cityOptions: SelectOption[] = selectedCountry
    ? selectedCountry.cities.map(city => ({
        label: city,
        value: city
      }))
    : []

  return (
    <section className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-10">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName}
          />
        </div>

        {/* Username, Email, Password */}
        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
        />
        <InputField
          label="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <PasswordField
          value={form.password}
          show={form.showPassword}
          onToggle={() =>
            setForm(prev => ({ ...prev, showPassword: !prev.showPassword }))
          }
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        {/* Phone */}
        <div className="grid grid-cols-3 gap-4 items-end">
          <SelectField
            label="Code"
            name="countryCode"
            value={form.countryCode}
            options={codeOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.countryCode}
          />
          <div className="col-span-2">
            <InputField
              label="Phone No."
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
            />
          </div>
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Country"
            name="country"
            value={form.country}
            options={countryOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.country}
          />
          <SelectField
            label="City"
            name="city"
            value={form.city}
            options={cityOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.city}
          />
        </div>

        {/* PAN & Aadhar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="PAN No."
            name="pan"
            value={form.pan}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.pan}
          />
          <InputField
            label="Aadhar No."
            name="aadhar"
            value={form.aadhar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.aadhar}
          />
        </div>

        {/* Submit */}
        <div className="text-right pt-4">
          <button
            type="submit"
            disabled={!isValid}
            className="px-5 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignUpForm
