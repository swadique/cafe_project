import React from 'react'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Message, Card } from 'semantic-ui-react'
import { Meteor } from 'meteor/meteor';

export default class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: '',
            loading: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

        let email = this.email.value.trim()
        let username = this.username.value.trim()
        let password = this.password.value.trim()

        this.setState({ loading: true })


        Accounts.createUser({ email, username, password }, (err) => {
            if (err) {
                this.setState({ error: err.reason, loading: false })
                alert(err.reason)
            }
            else {
                this.setState({ error: '', loading: false })
                alert("Registration Successfull")
            }
        });

        this.email.value = ""
        this.username.value = ""
        this.password.value = ""

    }

    render() {
        return (
            <div className="card-center">
                <div className="ui centered card">
                    <Card>
                        <Card.Content>
                            <Card.Header>Register</Card.Header>
                            <Card.Description>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input type="email" placeholder="Email" ref={e => this.email = e} required /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Username</label>
                                        <input type="text" placeholder="Username" ref={e => this.username = e} required /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input type="password" placeholder="Password" ref={e => this.password = e} required /><br />
                                    </Form.Field>
                                    <Button type="submit" loading={this.state.loading}>Register</Button>
                                </Form>
                                <br />
                                <div>
                                    <Message>
                                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                                    </Message>
                                </div>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        )
    }
}