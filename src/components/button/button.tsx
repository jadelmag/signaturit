import { EMPTY_STRING } from "@/constants/string.constants";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./button.scss";

interface CustomButtonProps {
  title: string;
  variant: "text" | "contained" | "outlined";
  type: "button" | "reset" | "submit";
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  type,
  variant,
  disabled,
  onClick,
}): JSX.Element => {
  const disabledClass = disabled ? "custom-button__disabled" : EMPTY_STRING;

  return (
    <Stack className="custom-button-stack" spacing={2} direction="row">
      <Button
        className={`custom-button ${disabledClass}`}
        disabled={disabled}
        variant={variant}
        type={type}
        title={title}
        onClick={onClick}
      >
        {title}
      </Button>
    </Stack>
  );
};
