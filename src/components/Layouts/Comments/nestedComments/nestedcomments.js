import React from 'react'

const nestedComments = props => {
    return(
        <div className='row'>
            <p className='col-sm-2'>{props.user}</p>
            <p className='col-sm-10'>{props.content}</p>
        </div>
    )
}
export default nestedComments