import React from 'react'

import './card.css';
import Comments from '../Comments/commnts'

const cards = props => {
    const comment = props.comments.map(comment => {
        return <Comments
                    key={comment._id} 
                    comments={comment.comments}
                    commentId={comment._id}
                    content={comment.comment}
                    postId={props.postId}
                    onSubmit={props.nestedSubmit}
                    onChange={props.onChange}
                    user={comment.userId.name} />
    })
    return(
        <div className="card myrow">
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <h1>{props.name}</h1>
                <p className="card-text">{props.post}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                {comment}
                <form onSubmit={props.onSubmit}>
                    <input className='form-control' type='text' placeholder='enter your comment' name='comment' onChange={event => props.onChange(event)} />
                    <input className='btn btn-outline-primary' type='submit' value='comment' />
                </form>
            </div>
        </div>
    )
}

export default cards