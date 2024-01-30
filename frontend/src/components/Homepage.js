import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [today, setToday] = useState([]);

    useEffect(() => {
        const today = new Date();
        const dateObject = {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
        }
        setToday(dateObject)
    }, []);


    return (
        <div>
            <p>Instructions Page</p>
            <Link to={`/${today.year}/${today.month}/${today.day}`}>Today's Matrix</Link>
        </div>
    );
}

export default Homepage;