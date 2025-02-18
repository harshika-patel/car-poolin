import logoImg from '../../assets/image/carpool.jpg';
import './Header.scss';
const Header=()=>{
 return(<header className='header'>
    <img src={logoImg} alt="Logo-img" className='header__img' />
    <div className='header__div'>
    <h1 className="header__title">Car Poolin</h1>
    <p className="header__detail">Drive and save Money</p>
    </div>
 </header>)
}
export default Header;