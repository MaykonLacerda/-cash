import { TEXT } from 'constants/messages';
import { SelectHTMLAttributes } from 'react';
import './styles.css';

export type IOption = {
  value: string;
  label: string;
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: IOption[];
}

export function Select({ options, ...props }: SelectProps) {
  return (
    <label className="select-field-component">
      Tipo
      <select {...props}>
        <option>
          --
          {' '}
          {TEXT.DefaultSelectPlaceholder}
          {' '}
          --
        </option>
        {options?.map(({ label, value }) => <option value={value}>{label}</option>)}
      </select>
    </label>
  );
}
