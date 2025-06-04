import React from 'react';

interface Props {
  value: string;
  show: boolean;
  error?: string;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<Props> = ({ value, show, error, onToggle, onChange, onBlur }) => (
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
    <div className="relative mt-1">
      <input
        id="password"
        name="password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={show ? 'text' : 'password'}
        className="block w-full border border-gray-300 rounded-md p-2 pr-10"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-2 text-sm"
      >
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default PasswordField;