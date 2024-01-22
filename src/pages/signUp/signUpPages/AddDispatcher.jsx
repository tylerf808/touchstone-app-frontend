import '../signUpStyles.css' 
import { useState } from 'react'

export default function AddDispatcher(props){

    return(
        <div className="pageContainer">
            <div className="slideTitle">
                <h3 style={{color: 'orange'}}>Add Dispatcher</h3>
            </div>
            <div className="addDispatcherSlide">
                <div className='dispatchItem'>
                    <p>Email:</p>
                    <input defaultValue={props.dispatcher.email} onChange={(e) => props.setDispatcher({...props.dispatcher, email: e.target.value})}></input>
                </div>
                <div className='dispatchItem'>
                    <p>Username:</p>
                    <input defaultValue={props.dispatcher.username} onChange={(e) => props.setDispatcher({...props.dispatcher, username: e.target.value})}></input>
                </div>
                <div className='dispatchItem'>
                    <p>Name:</p>
                    <input defaultValue={props.dispatcher.name} onChange={(e) => props.setDispatcher({...props.dispatcher, name: e.target.value})}></input>
                </div>
                <div className='dispatchItem'>
                    <p>Company Name:</p>
                    <input defaultValue={props.dispatcher.company} onChange={(e) => props.setDispatcher({...props.dispatcher, company: e.target.value})}></input>
                </div>
                <div className='dispatchItem'>
                    <p>Password:</p>
                    <input defaultValue={props.dispatcher.password} type='password' onChange={(e) => props.setDispatcher({...props.dispatcher, password: e.target.value})}></input>
                </div>
            </div>
            <div className='progressContainer'>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='currentDot'></span>
                <span className='dot'></span>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    props.setShowAlert(false)
                    props.setCurrentSlide(props.currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={() => {
                    if(props.dispatcher.email === '' || props.dispatcher.username === '' || props.dispatcher.name === '' || props.dispatcher.company === ''){
                        props.setAlertMsg('Missing an entry')
                        props.setShowAlert(true)
                    } else {
                        props.setShowAlert(false)
                        props.setCurrentSlide(props.currentSlide + 1)
                    }
                    }}>Next</button>
            </div>
        </div>
    )
}