import './styles.css';

export type TitleProps = {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <h2 className="title-component">{title}</h2>
  );
}
