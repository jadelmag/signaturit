import { CustomHeader } from "@/components";
import { PAGES } from "@/constants/pages.constants";
import { ROUTE } from "@/constants/routes.constants";
import HomePage from "@/views/homepage/homepage";
import { NotFoundPage } from "@/views/notfoundpage/notfoundpage";
import TrackingPage from "@/views/trackingpage/trackingpage";
import { Route, Routes } from "react-router-dom";

export const Router: React.FC = (): JSX.Element => {
  return (
    <>
      <CustomHeader title="Document Management System" pages={PAGES} />
      <Routes>
        <Route path={ROUTE.HOME} element={<HomePage />} />
        <Route path={ROUTE.TRACKING} element={<TrackingPage />} />
        <Route path={ROUTE.DEFAULT} element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
