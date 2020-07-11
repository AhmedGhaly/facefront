import React from 'react'

const err = props => {
    let errors = ''
    if(props.error[0].msg){
        for(let i of props.error) {
           errors += i.msg
        }
    } else {
        errors += props.error
    }
    return (
        <h5 className='alert alert-danger'>
            {errors}
        </h5>
    )
}
export default err