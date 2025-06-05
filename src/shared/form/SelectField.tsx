import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<Props> = ({
  label,
  name,
  value,
  options,
  error,
  onChange,
  onBlur
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default SelectField;
