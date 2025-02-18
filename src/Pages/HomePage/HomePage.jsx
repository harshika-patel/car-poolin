import carpool from  "../../assets/image/carpool.jpg";
import { Link } from "react-router-dom";
import "./HomePage.scss";
const HomePage=()=>{
    return(
    <div className="start-page">
        <img src={carpool} alt="Hero image" className="start-page__img"/>
        <h1 className="start-page__title">Car Poolin</h1>
        <p className="start-page__detail">Drive and save Money</p>
        <Link to='/RiderRegister'><button className="start-page__signIn-rider-btn start-page__btn">Sign-in as Rider</button></Link>
        <Link to='/PassengerRegister'><button className="start-page__signIn-passenger-btn start-page__btn">Sign-in as Passenger</button></Link>
        <p className="start-page__para">OR</p>
        <Link to='/login'><button className="start-page__login-btn start-page__btn">Login</button></Link>
    </div>
);
}
export default HomePage;