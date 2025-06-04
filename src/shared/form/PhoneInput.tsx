import React, { ChangeEvent, FocusEvent } from 'react';

interface PhoneInputProps {
  countryCode: string;
  phone: string;
  countryCodeError?: string;
  phoneError?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  phone,
  countryCodeError,
  phoneError,
  onChange,
  onBlur,
}) => (
  <div className="grid grid-cols-3 gap-4 items-end">
    <div>
      <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
        Code
      </label>
      <select
        id="countryCode"
        name="countryCode"
        value={countryCode}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-1 block w-full border rounded-md p-2 ${
          countryCodeError ? 'border-red-600' : 'border-gray-300'
        }`}
      >
        <option value="+91">+91</option>
        <option value="+1">+1</option>
        <option value="+44">+44</option>
      </select>
      {countryCodeError && <p className="mt-1 text-sm text-red-600">{countryCodeError}</p>}
    </div>
    <div className="col-span-2">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone No.
      </label>
      <input
        id="phone"
        name="phone"
        value={phone}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-1 block w-full border rounded-md p-2 ${
          phoneError ? 'border-red-600' : 'border-gray-300'
        }`}
      />
      {phoneError && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
    </div>
  </div>
);

export default PhoneInput;
