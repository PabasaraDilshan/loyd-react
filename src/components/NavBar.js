import React,{useState} from 'react'
import {Button} from './Button'
import {Link} from 'react-router-dom'
import './NavBar.css';
import DropDown from './DropDown'


function NavBar(){
    const [click,setClick] = useState(false);
    const [dropdown,setDropDown] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const onMouseEnter = ()=>{
        if(window.innerWidth<960){
            setDropDown(false);
        }else{
            setDropDown(true);
        }
    };
    const onMouseLeave = ()=>{
        if(window.innerWidth<960){
            setDropDown(false);
        }else{
            setDropDown(false);
        }
    };
    return(
        <nav className = "navbar">
            <Link to='/' className = 'navbar-logo'>
                Light On Your Dreams
            </Link>
            <div className = 'menu-icon' onClick = {handleClick}>
                <i className = {click ? 'fas fa-times' : 'fas fa-bars'}/>

            </div>
            <ul className = {click?'nav-menu active' : 'nav-menu'}>
                <li className = 'nav-item'>
                    <Link to = '/' className = 'nav-links' onClick = {closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className = 'nav-item' onMouseEnter = {onMouseEnter} onMouseLeave = {onMouseLeave}>
                    <Link to = '/services' className = 'nav-links' onClick = {closeMobileMenu}>
                        Institutes<i className = 'fas fa-caret-down'/>
                    </Link>
                    {dropdown && <DropDown/>}
                </li>
                <li className = 'nav-item'>
                    <Link to = '/contact-us' className = 'nav-links' onClick = {closeMobileMenu}>
                        Contact Us
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link to = '/sign-up' className = 'nav-links-mobile' onClick = {closeMobileMenu}>
                        Sign Up
                    </Link>
                    <Button/>
                </li>
            </ul>
        </nav>
       
    );
}

export default NavBar;