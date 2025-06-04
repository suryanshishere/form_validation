import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
  countryCode: string;
  phone: string;
  country: string;
  city: string;
  pan: string;
  aadhar: string;
}

interface FormErrors {
  [key: string]: string;
}

const countries: Record<string, string[]> = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  UK: ['London', 'Manchester', 'Birmingham'],
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const aadharRegex = /^[0-9]{12}$/;
const phoneRegex = /^[0-9]{10}$/;

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    countryCode: '+91',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const noErrors = Object.values(errors).every(err => err === '');
    const allFilled = Object.entries(form)
      .filter(([key]) => key !== 'showPassword')
      .every(([, val]) => val !== '');
    setIsValid(noErrors && allFilled);
  }, [errors, form]);

  const validate = (name: keyof FormData, value: string | boolean) => {
    let error = '';
    if (typeof value === 'string') {
      switch (name) {
        case 'firstName':
        case 'lastName':
        case 'username':
          if (!value.trim()) error = 'This field is required';
          break;
        case 'email':
          if (!value.trim()) error = 'E-mail is required';
          else if (!emailRegex.test(value)) error = 'Invalid e-mail';
          break;
        case 'password':
          if (!value) error = 'Password is required';
          else if (value.length < 8) error = 'Minimum 8 characters';
          break;
        case 'phone':
          if (!value.trim()) error = 'Phone number is required';
          else if (!phoneRegex.test(value)) error = 'Invalid phone number';
          break;
        case 'country':
          if (!value) error = 'Select country';
          break;
        case 'city':
          if (!value) error = 'Select city';
          break;
        case 'pan':
          if (!value.trim()) error = 'PAN No. is required';
          else if (!panRegex.test(value)) error = 'Invalid PAN';
          break;
        case 'aadhar':
          if (!value.trim()) error = 'Aadhar No. is required';
          else if (!aadharRegex.test(value)) error = 'Invalid Aadhar';
          break;
        default:
          break;
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const val: string | boolean = type === 'checkbox' ? checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
    validate(name as keyof FormData, val as string);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    (Object.entries(form) as [keyof FormData, string | boolean][]).forEach(([name, value]) =>
      validate(name, value as string)
    );
    if (isValid) navigate('/success', { state: form });
  };

  return (
    <section className="bg-white shadow rounded-lg p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Sign Up</h1>
      </header>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstName" name="firstName" value={form.firstName} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastName" name="lastName" value={form.lastName} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        {/* Username & Email */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username" name="username" value={form.username} onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            id="email" name="email" value={form.email} onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative">
            <input
              id="password" name="password" type={form.showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2 pr-10"
            />
            <button
              type="button" onClick={() => setForm(prev => ({ ...prev, showPassword: !prev.showPassword }))}
              className="absolute inset-y-0 right-2 text-sm"
            >
              {form.showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        {/* Phone */}
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Code</label>
            <select
              id="countryCode" name="countryCode" value={form.countryCode} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone No.</label>
            <input
              id="phone" name="phone" value={form.phone} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <select
              id="country" name="country" value={form.country} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Country</option>
              {Object.keys(countries).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <select
              id="city" name="city" value={form.city} onChange={handleChange} disabled={!form.country}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select City</option>
              {form.country && countries[form.country].map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>
        </div>

        {/* PAN & Aadhar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pan" className="block text-sm font-medium text-gray-700">PAN No.</label>
            <input
              id="pan" name="pan" value={form.pan} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.pan && <p className="mt-1 text-sm text-red-600">{errors.pan}</p>}
          </div>
          <div>
            <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700">Aadhar No.</label>
            <input
              id="aadhar" name="aadhar" value={form.aadhar} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.aadhar && <p className="mt-1 text-sm text-red-600">{errors.aadhar}</p>}
          </div>
        </div>

        <footer className="mt-6 text-right">
          <button
            type="submit"
            disabled={!isValid}
            className="px-5 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >Submit</button>
        </footer>
      </form>
    </section>
  );
};

export default SignUpForm;