import React,{Component} from 'react';
import {isAuthenticated, logout} from '../helper/jwt';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import { getSpinner } from '../helper/helper';
import { getConfig } from '../helper/jwt';

class AuthenticatedComponent extends Component{
    constructor(props){
        super(props);

        this.state={
            user : undefined,
            registerMode:false
        }
    }

    componentDidMount(){
        if(!isAuthenticated()){
            this.setState({registerMode:false});
            if(document.URL.indexOf('register') > -1){
                this.setState({registerMode : true});
                return;
            }
            this.setState({
                user: null
              });
              this.props.history.push('/login');
        }

        axios.get('/api/user', getConfig())
        .then(res=>{
            this.setState({user:res.data});
        }).catch(err=>{
            logout();
            this.props.history.push('/login');
        })

    }

    render() {
        const { user } = this.state;
        if (user === undefined && !this.state.registerMode) {
          return (
            <div className="text-center">
              {getSpinner(128, 128)}
            </div>
          );
        }

        return this.props.children;
      }
}

export default withRouter(AuthenticatedComponent);