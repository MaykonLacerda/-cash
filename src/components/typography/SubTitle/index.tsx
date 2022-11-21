import './styles.css';

export type SubTitleProps = {
  text: string;
}

export function SubTitle({ text }: SubTitleProps) {
  return (<h4 className="sub-title-component">{text}</h4>);
}
