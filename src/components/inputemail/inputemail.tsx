import DeleteIcon from "@/assets/svg/delete-icon.svg";
import "./inputemail.scss";

export interface CustomInputProps {
  id: string;
  email: string;
  placeholder: string;
  validEmail: boolean;
  onChangeEmail: (id: string, email: string) => void;
  onRemoveRow: (id: string) => void;
}

export const CustomInputEmail: React.FC<CustomInputProps> = ({
  id,
  email,
  placeholder,
  validEmail,
  onChangeEmail,
  onRemoveRow,
}): JSX.Element => {
  const onUpdateEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    onChangeEmail(id, value);
  };

  return (
    <div className="custom-input-email">
      <div className="custom-input-email-container">
        <input
          data-testid={"input-email"}
          id={`input-id-${id}`}
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={onUpdateEmail}
        />
        <div
          role="button"
          className="remove-icon"
          onClick={() => onRemoveRow(id)}
        >
          <DeleteIcon />
        </div>
      </div>
      {!validEmail && (
        <span className="email-error">
          El email no tiene una estructura válida
        </span>
      )}
    </div>
  );
};
