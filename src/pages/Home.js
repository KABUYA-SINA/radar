import React, { useCallback, useEffect, useState } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { FaTemperatureArrowUp } from 'react-icons/fa6';
import { FaTemperatureArrowDown } from 'react-icons/fa6';
import { GiWindsock } from 'react-icons/gi';
import { TbTemperaturePlus } from 'react-icons/tb';
import { BsWind } from 'react-icons/bs';
import { MdNotificationsActive } from 'react-icons/md';
import { ErrorBoundary } from "react-error-boundary";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Error from '../pages/Error';
import Loading from '../components/Loader';
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
import '../sass/base/_home-typo.scss';
import '../sass/pages/_home.scss';

const Home = () => {
    const [country, setCountry] = useState('Lyon');
    const [countryDetails, setCountryDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [loaderData, setLoaderData] = useState(false)
    let allNumbers = /^[0-9\b]+$/;
    let special = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g

    function refreshPage() {
        window.location.reload(true);
    }

    const handleCall = useCallback(() => {
        setLoading(true)
        setLoaderData(true)
        if (allNumbers.test(country) || special.test(country)) {
            alert("Numbers and special characters are not allowed")
            refreshPage()
        }
        if (!country) {
            alert('the country should not be empty. In addition, it is recommended to use an existing country')
            refreshPage()
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
            })).catch(error => { console.log(error) });
        setLoading(false)
        const loader = setTimeout(() => {
            setLoaderData(false);
        }, 1500);
        return () => clearTimeout(loader)
    }, [country])

    function handleOnchange(e) {
        setCountry(e.target.value)
    }

    useEffect(() => {
        handleCall();
    }, [])

    return (
        <ErrorBoundary FallbackComponent={Error} onReset={() => { }}>
            {loading ?
                <Loading aria-label="Loading Spinner" />
                :
                <div className='body'
                    style={
                        countryDetails.condition?.includes("Clear") ||
                            countryDetails.condition?.includes("Sunny")
                            ? { background: `center / cover no-repeat url(${sun})` }
                            : countryDetails.condition?.includes('cloudy')
                                ? { background: `center / cover no-repeat url(${cloud})` }
                                : countryDetails.condition?.includes('Heavy rain') ||
                                    countryDetails.condition?.includes('heavy rain shower')
                                    ? { background: `center / cover no-repeat url(${rain})` }
                                    : countryDetails.condition?.includes('Light rain') ||
                                        countryDetails.condition?.includes('Patchy rain')
                                        ? { background: `center / cover no-repeat url(${light})` }
                                        : countryDetails.condition?.includes('Moderate rain')
                                            ? { background: `center / cover no-repeat url(${moderate})`, color: `#A47E3B` }
                                            : countryDetails.condition?.includes('Overcast')
                                                ? { background: `center / cover no-repeat url(${overcast})` }
                                                : countryDetails.condition?.includes('drizzle')
                                                    ? { background: `center / cover no-repeat url(${drizzle})` }
                                                    : countryDetails.condition?.toLowerCase() === ('snow') ||
                                                        countryDetails.condition?.includes('Light snow')
                                                        ? { background: `center / cover no-repeat url(${snow})`, color: `#03224c` }
                                                        : { background: `center / cover no-repeat url(${overcastOne})` }
                    }
                >
                    <Header time={countryDetails.time} />
                    <main className="main">
                        {loaderData ?
                            <Loading aria-label="Loading Spinner" />
                            : <div className="first-main">
                                <div className="first">
                                    <h1>{Math.floor(countryDetails.farenheit?.celsius)}°C</h1>
                                    <div className="condition">
                                        <span className='condition-heading'>
                                            <MdNotificationsActive />
                                            <span className='para'>{countryDetails.condition}</span>
                                        </span>
                                        <span><TbTemperaturePlus /> {Math.floor(countryDetails.farenheit?.current)}° F</span>
                                        <span><FaTemperatureArrowUp /> {Math.floor((countryDetails.farenheit?.high - 32) * 5 / 9)}° C</span>
                                        <span><FaTemperatureArrowDown /> {Math.floor((countryDetails.farenheit?.low - 32) * 5 / 9)}° C</span>
                                    </div>
                                    <div className="wind">
                                        <span><GiWindsock /> {Math.floor(countryDetails?.windKph)} kph</span>
                                        <span><BsWind /> {Math.floor(countryDetails?.windMph)} mph</span>
                                    </div>
                                </div>
                                <h2>{countryDetails.city}, {countryDetails.country?.toUpperCase()}</h2>
                            </div>
                        }
                        <div className="second-main">
                            <input type='search' value={country.charAt(0).toUpperCase() + country.slice(1)} onChange={handleOnchange} placeholder={'country'} className='input' maxLength={17} />
                            <TbUserSearch onClick={handleCall} className='btn' />
                        </div>
                    </main>
                    <Footer continent={countryDetails.continent} image={countryDetails.image} />
                </div>
            }
        </ErrorBoundary>
    )
}

export default Home;