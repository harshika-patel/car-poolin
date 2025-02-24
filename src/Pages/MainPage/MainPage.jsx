import CardDetails from "../../components/CardDetails/CardDetails";
import Header from "../../components/Header/Header";

import SearchFunctionality from "../../components/SearchFunctionality/SearchFunctionality";
import { useAuth } from "../../contexts/AuthContext";
import "./MainPage.scss";
const MainPage = () => {
  
  
  return (
    <>
      <Header />
      <SearchFunctionality />
     
    </>
  );
};
export default MainPage;
