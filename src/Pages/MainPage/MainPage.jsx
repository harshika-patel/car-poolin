import CardDetails from "../../components/CardDetails/CardDetails";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import SearchFunctionality from "../../components/SearchFunctionality/SearchFunctionality";
import { useAuth } from '../../contexts/AuthContext';
import './MainPage.scss';
const MainPage=()=>{
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const handlePostRide = () => {
       
        navigate('/post-ride'); 
    };
    return(<>
    <Header/>
        <SearchFunctionality/>
        {currentUser && currentUser.role === 'driver' && (
        <button 
          type="button" 
          onClick={handlePostRide} 
          className="post-ride-button"
        >
          Post for Ride
        </button>
      )}
        <CardDetails/>
        </>
    );
}
export default MainPage;