/* eslint-disable no-unused-vars */
import React from 'react';
import { PinData } from '../context/PinContext';
import { Loading } from '../components/Loading';
import PinCard from '../components/PinCard';

const Home = () => {
    const { pins, loading } = PinData();

    return (
        <div>
            {loading ? (<Loading />
            ) : (
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {pins && pins.length > 0 ? (
                                pins.map((e, i) => <PinCard key={i} pin={e} />)
                            ) : (
                                < p > No Pins yet</p>
                            )}
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );

};

export default Home;