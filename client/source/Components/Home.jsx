import React, { useState } from 'react'
import { getHealth } from '../Api/client'
import { useEffect } from 'react'


const Home = () => {
    const [error, setError] = useState("");
    const [loading, setLaoding] = useState(true);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchHealth = async () => {
            try {
                setLaoding(true);
                const result = await getHealth();
                setData(result);
                setSuccess(true)
            } catch (error) {
                setError(error.message)

            }
            finally {
                setLaoding(false);
            }
        };
        fetchHealth();

    }, []);
    return (
        <div className='bg-blue-100'>
            <div>
                <h1 className="text-2xl">FreshMarket</h1>
                <p>Local grocery marketplace</p>

                {loading && <p>Connecting to API...</p>}

                {!loading && error && (
                    <p className="text-red-500">Error: {error}</p>
                )}

                {!loading && !error && data && success && (
                    <div>
                        <p>success: {data.db}</p>
                        <p>success: {data.status}</p>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Home
