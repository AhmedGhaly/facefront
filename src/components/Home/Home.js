import React, { Component } from 'react'

import Card from '../Layouts/cards/cards'
import Axios from '../../axios'

class Home extends Component {
    state = {
        posts: null,
        comment: null,
        post: ''
    }
    componentDidMount() {
        Axios.get('/feed',  {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
            this.setState({posts: res.data.posts})
        })
    }
    onSubmitHandler = (event, postId) => {
        event.preventDefault()
        Axios.post('/comment/'+postId, {comment: this.state.comment}, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
            const posts = [...this.state.posts]
            const post = this.state.posts.map((post, i) => {
                if(post._id === postId) {
                        res.data.comment.userId = {
                            _id: res.data.comment.userId,
                            name: localStorage.getItem('userName')
                        }
                    posts[i].comments.push(res.data.comment)
                }
                this.setState({posts: posts})
            })
        })
    }
    onChange = (event) => {
        const data = event.target.value
        this.setState({comment: data})
    }

    nestedSubmit = (event, commentId, postId) => {
        event.preventDefault()
        Axios.post('/nestedcomment/'+commentId, {commentText: this.state.comment}, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
            const posts = [...this.state.posts]
            const post = this.state.posts.map((post, i) => {
                if(post._id === postId) {
                        res.data.comment.userId = {
                            _id: res.data.comment.userId,
                            name: localStorage.getItem('userName')
                        }
                        posts[i].comments.map((comment, j) => {
                            if(comment._id === commentId) {
                                posts[i].comments[j].comments.push(res.data.comment)

                            }
                        })
                }
                this.setState({posts: posts})
            })
        })
    }

    postHandler = event => {
        event.preventDefault()
        Axios.post('/post', {content: this.state.post}, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
           const posts = [...this.state.posts] 
           res.data.post.userId = {
            _id: res.data.post.userId,
            name: localStorage.getItem('userName')
           }
           posts.unshift(res.data.post)
           this.setState({posts: posts, post: ''})
        })
    }

    onChangeHandler = event => {
        this.setState({post: event.target.value})
    }
    
    render() {
        let content
        if(this.state.posts){
            content = this.state.posts.map(post => {
                return <Card
                            postId={post._id}
                            key={post._id} 
                            onSubmit = {event => this.onSubmitHandler(event, post._id)}
                            onChange={this.onChange}
                            name={post.userId.name}
                            post={post.content}
                            nestedSubmit={this.nestedSubmit}
                            comments={post.comments}
                            />
            })

        }else {
            content = 'loading'
        }
        return (
            <div>
                <form className='text-center' onSubmit={(event) => this.postHandler(event)}>
                    <input value={this.state.post} className='form-control' onChange={event => this.onChangeHandler(event)} type='text' placeholder='enter the post'/>
                    <input className='btn btn-outline-primary' type='submit' value='post'/>
                </form>
                {content}
            </div>
        )
    }
}
export default Home