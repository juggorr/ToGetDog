// import { useEffect } from "react";
import { useLocation } from "react-router";

const Search = () => {
  const keyword = useLocation().state.keyword;

  return <div>{keyword}</div>;
};

export default Search;
