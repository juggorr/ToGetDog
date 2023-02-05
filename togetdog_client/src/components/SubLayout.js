import BackHeader from "./BackHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";

const SubLayout = () => {
  return (
    <>
      <BackHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default SubLayout;
