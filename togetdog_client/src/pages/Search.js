import { useLocation } from "react-router";

const Search = () => {
  const { keyword } = useLocation();

  return <div>search</div>;
};

export default Search;
