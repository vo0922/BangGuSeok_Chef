import {React, useEffect} from 'react';

function Teeessst() {
    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        localStorage.setItem('token', params.get("accesstoken"));
        console.log(localStorage.getItem('token'))
        window.location.replace('/')
    }, [])
    return (
        <div>
            콜백화면
        </div>
    );
}

export default Teeessst;