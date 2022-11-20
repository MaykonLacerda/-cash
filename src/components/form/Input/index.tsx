import { TEXT } from 'constants/messages';
import { InputHTMLAttributes } from 'react';
import './styles.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <label className="text-field-component">
      {label}
      <input {...props} placeholder={TEXT.DefaultInputPlaceholder} />
    </label>
  );
}
