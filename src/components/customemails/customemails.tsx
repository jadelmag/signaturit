import AddIcon from "@/assets/svg/add-icon.svg";
import { CustomInputEmail } from "@/components/inputemail/inputemail";
import { UserEmail } from "@/interfaces/useremail.interface";
import { validateEmail } from "@/utils/email.functions";
import { v4 as uuidv4 } from "uuid";
import "./customemails.scss";

interface CustomEmailsProps {
  emails: UserEmail[];
  onUpdateEmails: (emails: UserEmail[]) => void;
}

export const CustomEmails: React.FC<CustomEmailsProps> = ({
  emails,
  onUpdateEmails,
}): JSX.Element => {
  const onHandleNewEmail = () => {
    const userEmail = {
      id: uuidv4(),
      email: "",
      valid: false,
    };
    const currentEmails = [...emails];
    currentEmails.push(userEmail);

    onUpdateEmails(currentEmails);
  };

  const onHandleEmail = (id: string, email: string) => {
    const valid = validateEmail(email);
    const updateEmails = emails.map((user) =>
      user.id === id ? { ...user, email, valid } : user
    );
    onUpdateEmails(updateEmails);
  };

  const onRemoveEmailRow = (id: string) => {
    const updateEmails = emails.filter((user) => user.id !== id);
    onUpdateEmails(updateEmails);
  };

  return (
    <div className="custom-emails">
      <div className="custom-emails__icon">
        <div data-testid="svg" className="svg-icon" onClick={onHandleNewEmail}>
          <AddIcon />
        </div>
        <label>Añadir nuevo email</label>
      </div>
      <div className="custom-emails__inputs">
        {emails.map((userEmail: UserEmail) => {
          return (
            <CustomInputEmail
              key={userEmail.id}
              id={userEmail.id}
              email={userEmail.email}
              validEmail={userEmail.valid}
              placeholder="Introduzca el email"
              onChangeEmail={onHandleEmail}
              onRemoveRow={onRemoveEmailRow}
            />
          );
        })}
      </div>
    </div>
  );
};
