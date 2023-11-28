import React, {useState, useEffect} from 'react';
import axios from 'axios';
const endPoint = process.env.REACT_APP_LOCAL;

function Member(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restfulURL = endPoint + "/member/profile";
        axios.get(restfulURL)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data(: ' + restfulURL + ' ', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading? (
                <p>Loading...</p>
            ):(
                <div>
                    <h1>{data.title}</h1>
                    <h2>{data.body}</h2>
                </div>
            )}
        </div>
    )
}
export  default  Member;