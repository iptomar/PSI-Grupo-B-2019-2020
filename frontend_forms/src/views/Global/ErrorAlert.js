import React, { Component } from 'react';

class ErrorAlert extends Component {

    constructor(props){
        super(props);
        console.log("Error generated");
        console.log(props);
        this.state={"errors":props.errors};
    }

    render(){

        console.log(this.state.errors);
        const errors=Object.keys(this.state.errors).map( (item,key) =>

            Array.isArray(this.state.errors[item]) === true ? this.state.errors[item].map( (i,k) => <li key={item+k}>{ i }</li> ) : <li key={item}>{this.state.errors[item]}</li>

        );

        if(this.state.errors === null || typeof this.state.errors === undefined || Object.keys(this.state.errors).length === 0 ){
            return (<div></div>);
        } else {
            return (
                <div class="alert alert-warning">
                    { errors }
                </div>
            );
        }



    }

    componentWillReceiveProps({someProp}) {
        console.log("UPDATED ERRORALERT");
        this.setState({"errors":this.props.errors});
    }

}

export default ErrorAlert;