import BackHeader from "./BackHeader";
import { Outlet } from "react-router-dom";

const SubLayout = () => {
  return (
    <>
      <BackHeader />
      <Outlet />
    </>
  );
};

export default SubLayout;
