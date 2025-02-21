import CardDetails from "../../components/CardDetails/CardDetails";
import Header from "../../components/Header/Header"
import SearchFunctionality from "../../components/SearchFunctionality/SearchFunctionality";
const MainPage=()=>{
    return(<>
    <Header/>
        <SearchFunctionality/>
        <CardDetails/>
        </>
    );
}
export default MainPage;