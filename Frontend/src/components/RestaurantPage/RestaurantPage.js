import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import OrderFood from "../Cart/OrderFood";
//Define a Login Component
class RestaurantPage extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            restaurantID: "",
            profile: "",
            comments: "",
            rating: "",
            status: "",

        };
        this.commentsChangeHandler = this.commentsChangeHandler.bind(this);
        this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
        this.submitReview = this.submitReview.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("token")) {

        var data = { params: { idRestaurants: this.props.location.state } };
               axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

        axios.get("http://35.163.78.149:3001/restaurantProfile", data).then((response) => {
            //update the state with the response data
            console.log("profile did mount:", response.data);
            this.setState({
                restaurantID: response.data._id,
                profile: (
                    <Card>
                        <Card.Header>

                        </Card.Header>

                        <Card.Body>

                            <p><label >Email ID : {response.data.Email}</label></p>
                            <p><label >Name : {response.data.Name}</label></p>
                            <p><label >Location : {response.data.Location}</label></p>
                            <p><label >Description : {response.data.Description}</label></p>
                            <p><label >Contact : {response.data.Contact}</label></p>
                            <p><label >Timings : {response.data.Timings}</label></p>

                        </Card.Body>
                    </Card>),

            });
        });
    }
    }
    commentsChangeHandler = (e) => {
        this.setState({
            comments: e.target.value,
        });
    };
    ratingChangeHandler = (e) => {
        this.setState({
            rating: e.target.value,
        });
    };
    submitReview = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            customerID: localStorage.getItem("c_id"),
            restaurantID: this.state.restaurantID,
            ratings: this.state.rating,
            comments: this.state.comments,

        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

        //make a post request with the user data
        // this.props.signup(data);
        axios
            .post("http://35.163.78.149:3001/postReview", data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        status: (
                            <p>
                                Posted
                            </p>
                        ),
                    });

                } else {
                    this.setState({
                        status: (
                            <p>
                                Not Posted
                            </p>
                        ),
                    });
                }
            })
            .catch((e) => {
                debugger;
                console.log("FAIL!!!");
            });
            var data1 = { params: { idRestaurants: this.props.location.state } };
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

            axios.get("http://35.163.78.149:3001/getRestaurantOrders", data1).then((response) => {
                //update the state with the response data
                console.log(response.data);
                this.setState({
                    orders: response.data,
                    filteredorders: response.data,
                    orderStatusModal: false,
                    orderStatusEdited:"",
                    deliveryMode:"",
                    status:"",
                });
            });
    };


    render() {
        let redirectVar = null;
        let invalidCredentials = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }



        return (
            <div>
                {redirectVar}
                <div class="row">
                    <div class="col-3">
                        <div>
                            {this.state.profile}

                        </div>
                        <div>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Add Review
                                     </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>

                                            <Form onSubmit={this.submitReview} >
                                                <Form.Group controlId="formComments">
                                                    <Form.Label>Comments</Form.Label>
                                                    <Form.Control type="text" placeholder="Comments" onChange={this.commentsChangeHandler} />
                                                </Form.Group>
                                                <Form.Group controlId="formRating">
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control type="number" step="0.1" min="0" max="5" placeholder="Rating" onChange={this.ratingChangeHandler} />
                                                </Form.Group>

                                                <Button variant="danger" type="submit">
                                                    Post
                                        </Button>
                                                {this.state.status}
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>

                    </div>
                    <div class="col">
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Place Order
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <OrderFood restaurantID={this.state.restaurantID}/>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                </div>
                </div>

            </div>
        );

    }
}

export default RestaurantPage;