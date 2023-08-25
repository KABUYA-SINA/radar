import React, { useState } from 'react';

const Home = () => {
    const [country, setCountry] = useState('Lyon');
    const [coundtryDetails, setCountryDetails] = useState({})

    const handleCall = (e) => {
        e.preventDefault();
        fetch(
            `${process.env.REACT_APP_API_URL}=${country}${process.env.REACT_APP_API_NEXT_ELEMENT}`
        )
            .then((res) => res.json())
            .then((data) => setCountryDetails({
                country: data.location.country,
                region: data.location.region,
                city: data.location.name,
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
        <div className="home">
            <div className="first-home">
                <input type='search' value={country} onChange={handleOnchange} />
                <button onClick={handleCall}>search</button>
            </div>
            <div className="second-home">
                <div className="second-first">
                    <h1>{coundtryDetails?.farenheit?.current}</h1>
                    <div className="condition">
                        <span>{coundtryDetails?.condition}</span>
                        <span>{coundtryDetails?.farenheit?.high}</span>
                        <span>{coundtryDetails?.farenheit?.low}</span>
                    </div>
                </div>
                <h2>{coundtryDetails?.city} {coundtryDetails?.country}</h2>
            </div>
        </div>
    )
}

export default Home;