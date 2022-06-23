import React, { Component } from 'react'
import Portal from '../../Portal'
import './Modal.css'


export default class index extends Component {
    render() {
        const { children, toggle, active } = this.props


        return (
            <Portal>
                {active && (
                    <div className='modale-wrapper'>
                        <div className='modale-window'>
                            <a href="#" class="modale-closebtn" onClick={toggle}>&times;</a>

                            <div>{children}</div>
                        </div>
                    </div>
                )}
            </Portal>
        )
    }
}