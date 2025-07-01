import React, { useEffect, useState } from 'react';
import { Authaxios } from './Auth';

const Display = () => {
    const [data, setData] = useState([])

    const visible = () => {
        Authaxios.get('/readdata').then((res) => {
            console.log(res.data)
            res.data && setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(visible, [])

    return (
        <>
            {data.length === 0 ? <h1>loading</h1> : <>
                {
                    data.map((val, ind) => {
                        return (
                            <p>{val.name}</p>
                        )
                    })
                }
            </>}
        </>
    );
}

export default Display;
