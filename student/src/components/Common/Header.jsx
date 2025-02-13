import React, { useState } from 'react';
import profile from "../../assets/profile.webp";
import { User } from "lucide-react"
function Header({ data }) {
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    return (
        <div className='flex justify-between items-center border-b border-white/20 py-2 px-10 text-white'>
            <input type="text" className='rounded-2xl px-3 py-2 w-52 bg-black/10 text-white' placeholder='Search'/>
            <div className='flex space-x-3 items-center'>
                <div>{data.uname}</div>
                <span className='border rounded-full p-2 hover:cursor-pointer'><User /></span>
            </div>
        </div>  
    );

}

export default Header;