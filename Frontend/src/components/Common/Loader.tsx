import { Spinner } from '@nextui-org/react';
import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center'>
            <Spinner/>
        </div>
    );
};

export default Loader;