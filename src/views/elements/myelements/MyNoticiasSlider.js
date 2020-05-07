import React, {useState, useEffect} from 'react';
import Glide from '@glidejs/glide';

import  MyNoticiaCard from './MyNoticiaCard';

const MyNoticiasSlider = ({name}) => {

    const options = {
        type: 'carrousel',
        startAt: 0,
        perView: 5
    };

    const data = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
    ];

    const [slider] = useState(new Glide(`#glide_${name}`, options));

    useEffect(() => {

        slider.mount()
        return () => slider.destroy();
    }, [])


    return (
        <div id={`glide_${name}`} className="glide">
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    {data.map((value, idx) => {
                        return <MyNoticiaCard key={idx} />
                    })}
                </ul>
            </div>

        </div>

    );
}

export default MyNoticiasSlider;