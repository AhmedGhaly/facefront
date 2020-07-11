import  React, { Component } from 'react'

import Error from '../../errors/Errors'
import * as validate from '../../utils/Validation/Validation' 
import Input from '../../utils/Input/Input'
import Axios from '../../../axios'

class Signup extends Component {

    state = {
        userInfo: {
            email: {
                inputType: 'input',
                id: 1,
                config: {
                    placeholder: 'please enter you email',
                    value: '',
                    type: 'email',
                    name: 'email'
                },
                isValid: false,
                isTouched: false,
                validation: {
                    isRequire: true,
                    isEmail: true
                }
            },
            password: {
                inputType: 'input',
                id: 2,
                config: {
                    placeholder: 'please enter you password',
                    value: '',
                    type: 'password',
                    name: 'password'
                },
                isValid: false,
                isTouched: false,
                validation: {
                    isRequire: true,
                    minLength: 5
                }
            },
            name: {
                inputType: 'input',
                id: 3,
                config: {
                    placeholder: 'please enter you name',
                    value: '',
                    type: 'text',
                    name: 'name'
                },
                isValid: false,
                isTouched: false,
                validation: {
                    isRequire: true,
                    minLength: 5
                }
            },
            // confirmPassword: {
            //     inputType: 'input',
            //     id: 4,
            //     config: {
            //         placeholder: 'please enter you confirmPassword',
            //         value: '',
            //         type: 'password',
            //         name: 'confirmPassword'
            //     },
            //     isValid: false,
            //     isTouched: false,
            //     validation: {
            //         isRequire: true
            //     }
            // },
        },
        error: null
    }

    onChangeHandler = event =>{
        const name = event.target.name
        // console.log(event.target.name)
        const userInfo = {...this.state.userInfo}
        userInfo[name].config.value = event.target.value
        userInfo[name].isValid = validate.validate(event.target.value, userInfo[name].validation)
        userInfo[name].isTouched = true
        this.setState({userInfo: userInfo})
    }
    onSubmitHandler = event => {
        event.preventDefault()
        const data = {
            password: this.state.userInfo.password.config.value,
            email: this.state.userInfo.email.config.value,
            name: this.state.userInfo.name.config.value,
        }
        Axios.post('/signup', data).then(res => {

            this.props.history.push('/login')
        }).catch(err => {
            const error = err.response.data.err
            this.setState({error: error})
        })
    }
    render() {
        const inputs = Object.keys(this.state.userInfo).map(userInfo => {
            return <Input
                        isValid={this.state.userInfo[userInfo].isValid}
                        isTouched={this.state.userInfo[userInfo].isTouched}
                        onChange={event => this.onChangeHandler(event)}
                        key={this.state.userInfo[userInfo].id} 
                        config = {this.state.userInfo[userInfo].config}  />
        })
        return (
            <form onSubmit={event => this.onSubmitHandler(event)} className='text-center'>
                {this.state.error ? <Error error={this.state.error} /> : null}
                {inputs}
                <input className='btn btn-outline-primary' type='submit' value='Signup' />
            </form>
        )
    }
}

export default Signup