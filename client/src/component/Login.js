import React,{Component} from 'react';
import { getSpinner } from '../helper/helper';
import '../login.css';

export default class Login extends Component{
    constructor(prop){
        super(prop);
        this.state = {email:'', password:'', error:'', loadingType:''};
    }

    change = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
        
    }
    submitLogin(e) {
        e.preventDefault();
        return;
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
                            <input type="text" id="email" onChange={e=> this.change(e)} value={this.state.email} name="email" placeholder="email"/>
                            <input type="password" id="password" onChange={e=> this.change(e)} value={this.state.password} name="password" placeholder="password"/>
                            <label className="lblerror">{this.state.error ? this.state.error : ""}</label>
                            {this.state.loadingType ? 
                                (getSpinner()) : 
                                (<input className="login" type="submit" onClick={this.submitLogin.bind(this)} value="Log In"/>)}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}