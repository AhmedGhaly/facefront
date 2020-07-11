import React, { Component } from 'react'

import './comments.css'
import NestedComments from './nestedComments/nestedcomments'

class comments extends Component {
    
    render() {
        const nestedComment = this.props.comments.map(comment => {
            return  <NestedComments 
                        key={comment._id}
                        content={comment.comment}
                        user={comment.userId.name}
                        />
        })
        return (
            <div className='comment'>
                <div className='row'>
                    <p className='col-sm-2'>{this.props.user}</p>
                    <p className='col-sm-10'>{this.props.content}</p>
                </div>
                <div >
                    {nestedComment}
                    <form onSubmit={(event) => this.props.onSubmit(event, this.props.commentId, this.props.postId)}>
                        <input className='form-control' type='text' placeholder='enter your comment' name='comment' onChange={event => this.props.onChange(event)} />
                        <input className='btn btn-outline-primary' type='submit' value='comment' />
                    </form>
                </div>
            </div>
        )
    }
}

export default comments