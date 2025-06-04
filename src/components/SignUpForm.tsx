import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../shared/form/InputField';
import SelectField from '../shared/form/SelectField';
import PasswordField from '../shared/form/PasswordField';
import { validateField } from 'shared/utils/validators';

const countries: Record<string, string[]> = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  UK: ['London', 'Manchester', 'Birmingham'],
};

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const isValid = Object.values(errors).every(e => e === '') &&
    Object.entries(form)
      .filter(([key]) => key !== 'showPassword')
      .every(([_, val]) => val !== '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? checked : value;

    setForm(prev => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const error = validateField(name, typeof val === 'string' ? val : '');
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    for (const [name, value] of Object.entries(form)) {
      if (name !== 'showPassword') {
        newErrors[name] = validateField(name, typeof value === 'string' ? value : '');
      }
    }
    setErrors(newErrors);
    setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.values(newErrors).every(e => e === '')) {
      navigate('/success', { state: form });
    }
  };

  return (
    <section className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} onBlur={handleBlur} error={errors.firstName} />
          <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} onBlur={handleBlur} error={errors.lastName} />
        </div>

        <InputField label="Username" name="username" value={form.username} onChange={handleChange} onBlur={handleBlur} error={errors.username} />
        <InputField label="E-mail" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} />

        <PasswordField
          value={form.password}
          show={form.showPassword}
          error={errors.password}
          onToggle={() => setForm(prev => ({ ...prev, showPassword: !prev.showPassword }))}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="grid grid-cols-3 gap-4 items-end">
          <SelectField label="Code" name="countryCode" value={form.countryCode} options={['+91', '+1', '+44']} onChange={handleChange} error={undefined} />
          <div className="col-span-2">
            <InputField label="Phone No." name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField label="Country" name="country" value={form.country} options={Object.keys(countries)} onChange={handleChange} error={errors.country} />
          <SelectField label="City" name="city" value={form.city} options={form.country ? countries[form.country] : []} onChange={handleChange} error={errors.city} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="PAN No." name="pan" value={form.pan} onChange={handleChange} onBlur={handleBlur} error={errors.pan} />
          <InputField label="Aadhar No." name="aadhar" value={form.aadhar} onChange={handleChange} onBlur={handleBlur} error={errors.aadhar} />
        </div>

        <div className="text-right pt-4">
          <button type="submit"  disabled={!isValid} className="px-5 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
