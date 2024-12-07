import { Page } from "@/interfaces/pages.interfaces";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { EMPTY_STRING } from "@/constants/string.constants";
import "./header.scss";

interface CustomHeaderProps {
  title: string;
  pages: Page[];
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  pages,
}): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="custom-header">
        <Typography className="custom-header__title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <div className="custom-header__links">
          {pages.map((page: Page) => {
            return (
              <NavLink
                key={uuidv4()}
                id={`nav-link-${page.title}`}
                className={({ isActive }) =>
                  isActive ? "custom-header__links--active" : EMPTY_STRING
                }
                to={page.path}
              >
                {page.title}
              </NavLink>
            );
          })}
        </div>
      </AppBar>
    </Box>
  );
};
