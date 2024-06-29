import React from 'react'

export default function Header() {
    return (
        <header className="mb-5">
            <div className="header-top">
                <div className="container">
                    <div className="logo">
                        <p style={{fontSize: 1.5+'rem', fontWeight: 'bold', marginTop: '10px'}}>Sprint Todo App</p>
                    </div>
                </div>
            </div>
            <nav className="main-navbar">
                <div className="container">
                    <ul>
                        <li className="menu-item">
                            <a href="index.html" className='menu-link'>
                                <span><i className="bi bi-list-task"></i> On Going</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="completed.html" className='menu-link'>
                                <span><i className="bi bi-check2-square"></i> Completed</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="add.html" className='menu-link'>
                                <span><i className="bi bi-plus-square"></i> Add Task</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
