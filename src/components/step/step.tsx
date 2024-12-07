import './step.scss';

interface CustomStepProps {
  title: string;
}

export const CustomStep: React.FC<CustomStepProps> = ({ title }): JSX.Element => {
  return <section className="custom-step">{title}</section>;
};

