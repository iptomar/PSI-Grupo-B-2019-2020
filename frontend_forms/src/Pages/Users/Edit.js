import React, {PropTypes, Component} from 'react';
import usersApi from '../../scripts/api/users.js';
import ErrorAlert from '../../views/Global/ErrorAlert';

export default class Edit extends Component {

    constructor(props) {
        super(props);

        let userId = props.match.params.userId;

        this.state = {
            userid:userId,
            name:null,
            email:null,
            password:null,
            password_confirmation:null,
            errors:[]
        };


        usersApi.validateAuth(this.props);
        this.getUserById(userId);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Username</label>
                    <input type="text" id="name" placeholder="Enter your username" name="name" value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div>
                    <label htmlFor="email">E-Mail Address</label>
                    <input type="email" id="email"  placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                </div>
                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"  placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <div className="FormField">
                    <label htmlFor="password_confirmation">Password Confirmation</label>
                    <input type="password" id="password_confirmation"  placeholder="Re-enter your password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handlePasswordConfirmationChange} />
                </div>

                <div>
                    <button className="FormField__Button mr-20">Update</button>
                </div>

                <ErrorAlert errors={this.state.errors}/>
            </form>
        );
    }

    getUserById(uid){
        usersApi.get(uid).then( (response) => {

            this.setState({email:response.email, name: response.name});

        }).catch( (error) => {

        });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handlePasswordConfirmationChange(e){
        this.setState({password_confirmation: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        let body={
            email:this.state.email,
            name:this.state.name
        };

        if(this.state.password!==null){
            body.password=this.state.password;
            body.password_confirmation=this.state.password_confirmation;
        }

        usersApi.update(this.state.userid,body).then( (response)=>{
            this.props.history.push('/users');
        }).catch( (error) => {
            console.log(error);
            this.setState({errors:error});
        });
    }
}