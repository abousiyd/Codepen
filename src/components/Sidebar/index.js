import React from 'react'
import './Sidebar.css'

const Sidebar = ({toggle, toggleSkypack, download}) => {
    return (
        <div className='sidebar'>
            <ul className='sidebar-items'>
                <li className='sidebar-item' onClick={toggleSkypack}><i class="gg-profile"></i></li>
                <li className='sidebar-item' onClick={download}><i className="gg-software-download"></i></li>
                <li className='sidebar-item' onClick={toggle}><i class="gg-code-slash"></i></li>
            </ul>
        </div>
    )
}
export default Sidebar;