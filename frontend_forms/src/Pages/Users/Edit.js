import React, {PropTypes, Component} from 'react';
import usersApi from '../../scripts/api/users.js';
import ErrorAlert from '../../views/Global/ErrorAlert';
import './List.css';

export default class Edit extends Component {

    constructor(props) {
        super(props);

        let userId = props.match.params.userId;
        this.state = {
            userid:userId,
            name:null,
            email:null,
            role: null,
            password:null,
            password_confirmation:null,
            errors:[]
        };


        usersApi.validateAuth(this.props,"superadmin");
        this.getUserById(this.state.userid);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() { 
        return (
            <div className="fundo">
            <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                <h1 className ="text-center"><span className="font-weight-bold">Editar perfil do utilizador</span></h1>
                <div className="form-group row">
                    <label htmlFor="name">Username</label>
                    <input className="form-control" type="text" id="name" name="name" placeholder="Enter your username" name="name" value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div className="form-group row">
                    <label htmlFor="email">E-Mail Address</label>
                    <input className="form-control" type="email" id="email" name="email" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                </div>
                <div className="form-group row">
                    <label htmlFor="email">Role</label>
                    <input className="form-control" type="text" id="role" name="email" placeholder="Enter the desired role" name="role" value={this.state.role} onChange={this.handleRoleChange} />
                </div>
                <div className="form-group row">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" id="password" name="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <div className="form-group row">
                    <label htmlFor="password_confirmation">Password Confirmation</label>
                    <input className="form-control" type="password" id="password_confirmation" name="password_confirmation" placeholder="Re-enter your password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handlePasswordConfirmationChange} />
                </div>

                <div>
                    <button className="button mr-20">Update</button>
                </div>

                <ErrorAlert errors={this.state.errors}/>
            </form>
            </div>
        );
    }

    getUserById(uid){
        usersApi.get(uid).then( (response) => {
            console.log("response",response);
            this.setState({email:response.email, name: response.name, role: response.role});

        }).catch( (error) => {

        });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleRoleChange(e) {
        this.setState({ role: e.target.value });
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
            name:this.state.name,
            role:this.role
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