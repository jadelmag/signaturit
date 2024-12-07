import { ROUTE } from "@/constants/routes.constants";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <div className="management-system">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to={ROUTE.HOME}>Go to Home</Link>
      </div>
    </div>
  );
};
