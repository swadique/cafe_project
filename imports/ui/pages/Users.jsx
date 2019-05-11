import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Button, Form, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { Items } from '../../api/items.js';

export default class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: '',
            loading: false,
            username: '',
            category: 'veg'
        }
    }

    componentDidMount() {
        this.UserTracker = Tracker.autorun(() => {

            if (Meteor.user())
                this.setState({
                    username: Meteor.user().username
                })
        })
    }

    componentWillUnmount() {
        this.UserTracker.stop()
    }

    handleChange = (e) => {
        this.setState({ category: e.target.value });
    }

    onLogout = () => {
        this.setState({ loading: true })
        Accounts.logout()
    }

    insertItem = (e) => {
        e.preventDefault()
        let category = this.state.category
        let itemName = this.name.value.trim()
        let remainingNo = this.remaining.value.trim()

        const a = Items.find({}).fetch()
        var x = a[0][category]
        console.log(x)
        x[itemName] = parseInt(remainingNo)
        console.log(x)
        console.log(a[0]._id._str)
        Meteor.call('items.updateItem', a[0]._id, category,x, (err) => {
            alert("Added successfully")
        })

        this.category.value = ""
        this.itemName.value = ""
        this.remainingNo.value = ""
    }

    renderCategories = () => {
        const a = Items.find({}).fetch()[0]
        var arr = Object.keys(a)
        arr.shift()

        return arr.map(a => <option value={a}>{a}</option>)
    }

    insertCategory = (e) => {
        let categoryName = this.categoryName.value.trim()

        const a = Items.find({}).fetch()[0]
        var arr = Object.keys(a)
        if (arr.includes(categoryName)) {
            alert("category already exists")
            return
        }
        else {
            Meteor.call('items.addCategory', a._id, categoryName, (err) => {
                alert("Added successfully")
            })
        }
    }

    render() {

        if (this.state.username == 'Admin') {
            return (
                <div>
                    <div>
                        <Button onClick={this.onLogout} loading={this.state.loading}>Logout</Button>
                        <Link to="/"><Button style={{ float: "right" }}>Home</Button></Link>
                    </div>
                    <div>
                        <br />
                        <Card.Group>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Item Update</Card.Header>
                                    <Card.Description>
                                        <Form onSubmit={this.insertItem}>
                                            <Form.Field>
                                                <label>Category</label>
                                                <select
                                                    value={this.state.category}
                                                    onChange={this.handleChange} >
                                                    {this.renderCategories()}
                                                </select>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Item Name</label>
                                                <input type="text" placeholder="Item name" ref={e => this.name = e} required /><br />
                                            </Form.Field>
                                            <Form.Field>
                                                <label># remaining</label>
                                                <input type="number" placeholder="Remaining #" ref={e => this.remaining = e} required /><br />
                                            </Form.Field>
                                            <Button type="submit">Update</Button>
                                        </Form>
                                    </Card.Description>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Card.Content>
                                    <Card.Header>Add new Category</Card.Header>
                                    <Card.Description>
                                        <Form onSubmit={this.insertCategory}>
                                            <Form.Field>
                                                <label>Category Name</label>
                                                <input type="text" placeholder="Category name" ref={e => this.categoryName = e} required /><br />
                                            </Form.Field>
                                            <Button type="submit" >Add</Button>
                                        </Form>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </div>
                </div>

            )
        }
        else {
            return (
                <div>
                    <div>
                        <Button onClick={this.onLogout} loading={this.state.loading}>Logout</Button>
                        <Link to="/"><Button style={{ float: "right" }}>Home</Button></Link>
                    </div>
                    <div>
                        <p>Hi {this.state.username} user</p>
                    </div>
                </div>
            )
        }
    }

}
