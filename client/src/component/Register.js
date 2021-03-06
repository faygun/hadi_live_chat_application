import React,{Component} from 'react';
import axios from 'axios';
import '../login.css';
import { isAuthenticated } from '../helper/jwt';
import { getSpinner } from '../helper/helper';

export default class Register extends Component{
    constructor(prop){
        super(prop);
        this.state = {name: '', email:'', password:'', re_password:'', error:'', loadingType:''};
    }

    change = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
        
    }
    
    componentDidMount(){
        if(isAuthenticated())
            this.props.history.push('/channels');
    }

    submitLogin(e) {
        this.setState({error:''});

        e.preventDefault();
        if(!this.validateForm()){
            this.setState({error:'Please insert email or password'});
            return;
        }
        
        this.setState({loadingType:'cubes'});

        const config  = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        
        var request = {email : this.state.email, password : this.state.password, name: this.state.name};
        const body = JSON.stringify(request);
        
        axios.post('/api/user', body, config)
        .then(res => {
            this.setState({loadingType:''});
            localStorage.setItem("x-auth-token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            this.props.history.push('/channels');
        })
        .catch(err => {
            this.setState({loadingType:'', error:err.response.data});
        });
    }

    //Basic validation.
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.re_password;
    }

    render(){
        return(
            <div>
                <div className="wrapper">
                    <div id="formContent">
                        <div className="iconWrapper">
                            <img src="https://cdn.iha.com.tr/Contents/images/2018/29/2569826.jpg" id="icon" alt="User Icon" />
                        </div>
                        <form>
                            <input type="text" id="name" onChange={e=> this.change(e)} value={this.state.name} name="name" placeholder="name"/>
                            <input type="text" id="email" onChange={e=> this.change(e)} value={this.state.email} name="email" placeholder="email"/>
                            <input type="password" id="password" onChange={e=> this.change(e)} value={this.state.password} name="password" placeholder="password"/>
                            <input type="password" id="re_password" onChange={e=> this.change(e)} value={this.state.re_password} name="re_password" placeholder="re-password"/>
                            <label className="lblerror">{this.state.error ? this.state.error : ""}</label>
                            {this.state.loadingType ? 
                                (getSpinner()) : 
                                (<input className="login" type="submit" onClick={this.submitLogin.bind(this)} value="Sign up"/>)}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}