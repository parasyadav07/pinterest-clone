/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PinData } from '../context/PinContext';
import PinCard from '../components/PinCard';
import { UserData } from '../context/UserContext';

const UserProfile = ({ user: loggedInUser }) => {
    const params = useParams()
    const [user, setUser] = useState([]);

    async function fetchUser() {
        try {
            const { data } = await axios.get(`/api/user/${params.id}`)
            setUser(data);

        } catch (error) {
            console.log(error);
        }
    }

    const [isFollow, setisFollow] = useState(false);

    const { followUser } = UserData()

    const followHandler = () => {
        setisFollow(!isFollow);
        followUser(user._id, fetchUser);
    };

    const followers = user.followers

    useEffect(() => {
        if (followers && followers.includes(loggedInUser._id)) setisFollow(true);
    }, [user]);

    const { pins } = PinData();

    let userPins;

    if (pins) {
        userPins = pins.filter(pin => pin.owner === user._id);
    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div>
            {user &&
                <div className='flex flex-col items-center justify-center '>
                    <div className="p-6 w-full">
                        <div className="flex items-center justify-center ">
                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center ">
                                {user.name && <span className='text-3xl text-gray-700'>
                                    {user.name.slice(0, 1)}</span>}
                            </div>
                        </div>

                        <h1 className='text-center text-2xl font-bold mt-4'>{user.name}</h1>
                        <p className='text-center text-gray-600 mt-2'>{user.email}</p>
                        <p className='flex justify-center items-center text-center gap-3 text-gray-600 mt-2'>
                            {user.followers && <p>{user.followers.length} followers</p>}
                            {user.following && <p>{user.following.length} following</p>}

                        </p>
                        {
                            user && user._id === loggedInUser._id ? (""

                            )
                                : (
                                    <div className="flex justify-center mt-4 space-x-2">
                                        <button onClick={followHandler} className='bg-gray-200 px-4 py-2 rounded'>
                                            {isFollow ? "Unfollow" : "Follow"}
                                        </button>
                                    </div>
                                )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {userPins && userPins.length > 0 ? (
                                userPins.map((e) => <PinCard key={e._id} pin={e} />)
                            ) : (<p>No pin yet</p>
                            )}
                        </div>

                    </div>
                </div>}
        </div>
    )
}

export default UserProfile;