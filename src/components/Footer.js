import React from 'react';
import '../sass/layout/_footer.scss';

const Footer = ({ continent, image }) => {
    return (
        <footer className='footer'>
            {image ? <img src={image} alt={'detail weather'} /> : ''}
            <span className='footer-one'>
                {continent}
            </span>
        </footer>
    )
}

export default Footer