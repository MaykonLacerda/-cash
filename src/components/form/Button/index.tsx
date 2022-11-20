import { ButtonHTMLAttributes } from 'react';
import './styles.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="button-component" type="submit" {...props} />;
}
