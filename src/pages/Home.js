import React, { useCallback, useEffect, useState } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { FaTemperatureArrowUp } from 'react-icons/fa6';
import { FaTemperatureArrowDown } from 'react-icons/fa6';
import { GiWindsock } from 'react-icons/gi';
import { TbTemperaturePlus } from 'react-icons/tb';
import { BsWind } from 'react-icons/bs';
import { MdNotificationsActive } from 'react-icons/md';
import { ShakeRotate } from 'reshake';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sun from '../assets/sun.webp';
import cloud from '../assets/cloud.webp';
import rain from '../assets/rain.webp';
import snow from '../assets/snow.webp';
import moderate from '../assets/moderate.webp';
import overcastOne from '../assets/overcast-one.webp';
import overcast from '../assets/overcast.webp';
import light from '../assets/light-rain.webp';
import drizzle from '../assets/drizzle.webp';
import '../sass/base/_base.scss';
import '../sass/pages/_home.scss';

const Home = () => {
    const [country, setCountry] = useState('Lyon');
    const [coundtryDetails, setCountryDetails] = useState({})

    const handleCall = useCallback(() => {

        if (!country) {
            alert('the country should not be empty. In addition, it is recommended to use an existing country')
            return country === 'Paris'
        }
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
                    celsius: data.current.temp_c,
                    high: data.forecast.forecastday[0].day.maxtemp_f,
                    low: data.forecast.forecastday[0].day.mintemp_f,
                },
                condition: data.current.condition.text,
                image: data.current.condition.icon,
                windMph: data.current.wind_mph,
                windKph: data.current.wind_kph
            }))
    }, [country])

    function handleOnchange(e) {
        setCountry(e.target.value)
    }

    useEffect(() => {
        handleCall();
    }, [])

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
                            : coundtryDetails.condition?.includes('Light rain') ||
                                coundtryDetails.condition?.includes('Patchy rain')
                                ? { background: `center / cover no-repeat url(${light})` }
                                : coundtryDetails.condition?.includes('Moderate rain')
                                    ? { background: `center / cover no-repeat url(${moderate})` }
                                    : coundtryDetails.condition?.includes('Overcast')
                                        ? { background: `center / cover no-repeat url(${overcast})` }
                                        : coundtryDetails.condition?.includes('drizzle')
                                            ? { background: `center / cover no-repeat url(${drizzle})` }
                                            : coundtryDetails.condition?.toLowerCase() === ('snow')
                                                ? { background: `center / cover no-repeat url(${snow})` }
                                                : { background: `center / cover no-repeat url(${overcastOne})` }
            }
        >
            <Header time={coundtryDetails.time} />
            <main className="main">
                <div className="first-main">
                    <div className="first">
                        <h1>{Math.floor(coundtryDetails.farenheit?.celsius)}° C</h1>
                        <div className="condition">
                            <span className="condition-first">
                                <ShakeRotate
                                    fixed={true}
                                    fixedStop={false}
                                    freez={false}
                                >
                                    <MdNotificationsActive />
                                </ShakeRotate>
                                {coundtryDetails.condition?.toLowerCase()}
                            </span>
                            <span className="condition-second"><TbTemperaturePlus /> {coundtryDetails.farenheit?.current}° F</span>
                            <span className="condition-third"><FaTemperatureArrowUp /> {coundtryDetails.farenheit?.high}° F</span>
                            <span className="condition-four"><FaTemperatureArrowDown /> {coundtryDetails.farenheit?.low}° F</span>
                        </div>
                    </div>
                    <h2>{coundtryDetails.city} {coundtryDetails.country?.toUpperCase()}</h2>
                    <span className="condition-five"><GiWindsock /> {coundtryDetails?.windKph} kph</span>
                    <span className="condition-six"><BsWind /> {coundtryDetails?.windMph} mph</span>
                </div>
                <div className="second-main">
                    <input type='search' value={country.toUpperCase()} onChange={handleOnchange} placeholder={'country'} className='input' />
                    <TbUserSearch onClick={handleCall} className='btn' />
                </div>
            </main>
            <Footer continent={coundtryDetails.continent} image={coundtryDetails.image} />
        </div>
    )
}

export default Home;