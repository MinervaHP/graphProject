import React from 'react'


const Button = ({ text, icon, action, isDisabled }) => {
   
    return (
        <button className='btn' disabled={isDisabled} aria-hidden="true" onClick={() => action()}>  {text}    {icon} </button>
    )
}



export default Button