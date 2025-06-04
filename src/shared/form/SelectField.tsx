import React from 'react';

interface Props {
  label: string;
  name: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<Props> = ({ label, name, value, options, error, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    >
      <option value="">Select {label}</option>
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default SelectField;