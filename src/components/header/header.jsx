import React from 'react';
import useInit from '../../hooks/useInit';
import logo from '../../img/icon.png';
import './style.scss';

const Header = () => {
    useInit();
    
    return (
        <div className='container'>
            <img src={logo} className='container_img' />
        </div>
    )
}
export default Header;
