import { EMPTY_STRING } from "@/constants/string.constants";
import "./inputfile.scss";

interface CustomFileInputProps {
  title: string;
  fileName: string;
  accept: string;
  disabled: boolean;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const CustomFileInput: React.FC<CustomFileInputProps> = ({
  title,
  fileName,
  accept,
  disabled,
  handleFileChange,
}): JSX.Element => {
  return (
    <div className="custom-file-input">
      <label
        htmlFor="fileInput"
        className={`${disabled ? "custom-file-input__disabled" : EMPTY_STRING}`}
      >
        {title}
      </label>

      <div className="custom-file-input__files">
        {fileName && <span>{fileName}</span>}
      </div>

      <input
        type="file"
        id="fileInput"
        disabled={disabled}
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
