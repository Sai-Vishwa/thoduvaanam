import React, { useState } from 'react';
import profile from "../../assets/profile.webp";
import "./common.css";
function Header({data}) {
    const [showProfileOptions, setShowProfileOptions] = useState(false);

        const toggleProfileOptions = () => {
            setShowProfileOptions(!showProfileOptions);
        };

        return (
            <div>
                {JSON.stringify(data)}
            <div className="header flex">
               
            <div className="search-section" style={{ flexGrow: 1 }}>
            <input type="text" placeholder="Search here..." className="search-bar" style={{ width: '30%', padding: '10px', border: 'none', borderRadius: '20px' ,marginleft:'20px',fontWeight:'700',fontSize:'15px'}} />
            </div>
            
             <div className="profile-section" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
            <img
            src={profile}
            alt="profile"
            className="profile-pic"
            style={{ borderRadius: '100%', border: '2px solid #4CAF50', cursor: 'pointer', marginBottom: '10px', height: '6vh' }}
            onClick={toggleProfileOptions}
            />
            {showProfileOptions && (
            <div className="profile-options" style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 1 }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
                <li style={{ padding: '5px 0', cursor: 'pointer' }}>Update Profile</li>
                <li style={{ padding: '5px 0', cursor: 'pointer' }}>View Profile</li>
                <li style={{ padding: '5px 0', cursor: 'pointer' }}>Logout</li>
                </ul>
            </div>
            )}
            <div className="user-details" style={{ color: '#fff', textAlign: 'center' }}>
            <h2 style={{ color: '#4CAF50', margin: 0 }}>uedehu</h2>
            <p style={{ color: '#ddd', margin: 0 }}>user@example.com</p>
            </div>
             </div>
            </div>
            
           
           
            </div>
        );

    }

export default Header;