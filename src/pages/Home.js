import React, { useEffect, useState } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sun from '../assets/sun.webp';
import cloud from '../assets/cloud.webp';
import rain from '../assets/rain.webp';
import snow from '../assets/snow.webp';
import moderate from '../assets/moderate.webp';
import overcast from '../assets/overcast.webp';
import light from '../assets/light-rain.webp';
import drizzle from '../assets/drizzle.webp';
import '../sass/base/_base.scss';
import '../sass/pages/_home.scss';

const Home = () => {
    const [country, setCountry] = useState('Lyon');
    const [coundtryDetails, setCountryDetails] = useState({})

    useEffect(() => {
        handleCall();
    })
    const handleCall = () => {
        fetch(
            `${process.env.REACT_APP_API_URL}=${country}${process.env.REACT_APP_API_NEXT_ELEMENT}`
        )
            .then((res) => res.json())
            .then((data) => setCountryDetails({
                country: data.location.country,
                region: data.location.region,
                city: data.location.name,
                time: data.location.localtime,
                continent: data.location.tz_id,
                farenheit: {
                    current: data.current.temp_f,
                    high: data.forecast.forecastday[0].day.maxtemp_f,
                    low: data.forecast.forecastday[0].day.mintemp_f,
                },
                condition: data.current.condition.text,
                image: data.current.condition.icon
            }))
    }
    function handleOnchange(e) {
        setCountry(e.target.value)
    }

    return (
        <div className='body'
            style={
                coundtryDetails.condition?.includes("Clear") ||
                    coundtryDetails.condition?.includes("Sunny")
                    ? { background: `center / cover no-repeat url(${sun})` }
                    : coundtryDetails.condition?.includes('cloudy')
                        ? { background: `center / cover no-repeat url(${cloud})` }
                        : coundtryDetails.condition?.includes('Heavy rain') ||
                            coundtryDetails.condition?.includes('heavy rain shower')
                            ? { background: `center / cover no-repeat url(${rain})` }
                            : coundtryDetails.condition?.includes('Light rain')
                                ? { background: `center / cover no-repeat url(${light})` }
                                : coundtryDetails.condition?.includes('Moderate rain')
                                    ? { background: `center / cover no-repeat url(${moderate})` }
                                    : coundtryDetails.condition?.includes('Overcast')
                                        ? { background: `center / cover no-repeat url(${overcast})` }
                                        : coundtryDetails.condition?.includes('drizzle')
                                            ? { background: `center / cover no-repeat url(${drizzle})` }
                                            : coundtryDetails.condition?.toLowerCase() === ('snow')
                                                ? { background: `center / cover no-repeat url(${snow})` }
                                                : { background: `center / cover no-repeat url(${overcast})` }
            }
        >
            <Header time={coundtryDetails.time} />
            <main className="main">
                <div className="first-main">
                    <div className="first">
                        <h1>{coundtryDetails.farenheit?.current}° F</h1>
                        <div className="condition">
                            <span>{coundtryDetails.condition}</span>
                            <span>{coundtryDetails.farenheit?.high}° F</span>
                            <span>{coundtryDetails.farenheit?.low}° F</span>
                        </div>
                    </div>
                    <h2>{coundtryDetails.city} {coundtryDetails.country?.toUpperCase()}</h2>
                </div>
                <div className="second-main">
                    <input type='search' value={country} onChange={handleOnchange} className='input' />
                    <TbUserSearch onClick={handleCall} className='btn' />
                </div>
            </main>
            <Footer continent={coundtryDetails.continent} image={coundtryDetails.image} />
        </div>
    )
}

export default Home;