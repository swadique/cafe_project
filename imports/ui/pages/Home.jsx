import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Button, Card, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import { People } from '../../api/people.js';
import { Items } from '../../api/items.js';

export default class Home extends React.Component {

    constructor(props) {

        super(props)
        this.records = Items.find({}).fetch()[0]
    }

    inside = () => {

        var a = People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();

        a = a.map(function (elem) {
            return elem.No_of_people;
        });

        var n = a[0];

        if (n > 2000) {
            return 0;
        }
        else if (n < 0) {
            return 2000;
        }
        else {
            return 2000 - n;
        }

    }

    renderItem = (i) => {

        var a = this.records[i]

        const keys = Object.keys(a)
        const values = Object.values(a)

        const items = keys.map((key, index) => {

            return {
                key,
                value: values[index]
            }
        })
        return items.map(item => <span><List.Item>{item.key} (x{item.value})</List.Item><br /></span>)

    }

    renderHomeItems = () => {
        var a = this.records
        const categories = Object.keys(a)
        categories.shift()

        return categories.map(x =>
            <Card>
                <Card.Content>
                    <Card.Header content={x} />
                    <Card.Meta content='Today' />
                    <Card.Description>
                        <List>
                            {this.renderItem(x)}
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }

    render() {

        return (
            <div>
                {
                    !Meteor.userId() ?
                        <Link to='/login'>
                            <Button style={{ float: "right" }}>Login</Button>
                        </Link>
                        :
                        <Link to='/user'>
                            <Button style={{ float: "right" }}>User Account</Button>
                        </Link>
                }
                <div class="all"><br />
                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>Seats Remaining</Card.Header>

                                <Card.Description>
                                    <span class="number">{this.inside()}</span>
                                    <hr class="hrline" />
                                    <span class="number">2000</span>
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        {this.renderHomeItems()}
                        
                    </Card.Group>

                </div>
            </div>
        )
    }
}
