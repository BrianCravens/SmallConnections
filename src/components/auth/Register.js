import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import {Button} from 'react-bootstrap'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Login.css"


const Register = props => {
    const email = useRef()
    const userName = useRef()
    const lastName = useRef()
    const password = useRef()
    const firstName = useRef()
    const address = useRef()
    const phone = useRef()
    const birthday = useRef()
    const verifyPassword = useRef()
    const { register } = useSimpleAuth()

    const handleRegister = (e) => {
        e.preventDefault()

        const newUser = {
            "username": userName.current.value,
            "first_name": firstName.current.value,
            "last_name": lastName.current.value,
            "address": address.current.value,
            "phone": phone.current.value,
            "birthday": birthday.current.value,
            "email": email.current.value,
            "password": password.current.value
        }

        register(newUser).then(() => {
            props.history.push({
                pathname: "/"
            })
        })
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Small Connections Registration</h1>
                <fieldset>
                    <label htmlFor="userName"> Username </label>
                    <input ref={userName} type="text"
                        name="userName"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputAddress"> Address </label>
                    <input ref={address} type="text"
                        name="address"
                        className="form-control"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPhone"> Phone Number </label>
                    <input ref={phone} type="tel"
                        name="phone"
                        className="form-control"
                        required />
                </fieldset>
                <fieldset className='form-element'>
                    <label htmlFor='birthday'>Birthday</label>
                    <input ref={birthday} type='date' id='birthday' />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <Button className='btn-success' type="submit">
                        Sign in
                    </Button>
                </fieldset>
            </form>
        </main>
    )
}
export default withRouter(Register)