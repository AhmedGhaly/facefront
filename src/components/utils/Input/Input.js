import React from 'react'

import './input.css'

const input = props => {
    let content
    switch(props.inputType) {
        case ('input'): 
        content = <input onChange={props.onChange} className='form-control' {...props.config}/>
        break
    default: 
        content = <input onChange={props.onChange} className='form-control' {...props.config}/>
        break

    }
    return (
        <React.Fragment>
            {content}
            {!props.isValid && props.isTouched ? <p className='invalid'>this is not valid</p> : null} 
        </React.Fragment>
    )
}

export default input