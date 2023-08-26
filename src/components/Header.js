import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiRadarFill } from 'react-icons/ri';
import '../sass/layout/_header.scss';

const Header = ({ time }) => {
    return (
        <header className='header'>
            <NavLink to='/'>
                <div className="header-one">
                    <RiRadarFill />
                    <h1>Radar</h1>
                </div>
                <div className="header-second">
                    <span className="time">
                        {time}
                    </span>
                </div>
            </NavLink>
        </header>
    )
}

export default Header