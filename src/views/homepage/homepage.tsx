import { CustomButton } from "@/components";
import { useStepContext } from "@/context/stepdocument.context";
import SignerDocument from "@/views/homepage/signers/signerdocument";
import UploadDocument from "@/views/homepage/upload/uploaddocument";

const HomePage: React.FC = (): JSX.Element => {
  const { showStep, clearStep } = useStepContext();

  return (
    <div className="management-system">
      <div className="management-system__clear-button">
        <CustomButton
          title="Vaciar Información"
          type="button"
          disabled={false}
          variant="contained"
          onClick={() => clearStep()}
        />
      </div>
      <div className="container">
        <UploadDocument />
        {showStep && (
          <div className="signer-document">
            <SignerDocument />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
