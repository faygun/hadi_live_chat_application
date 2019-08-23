import React,{Component} from 'react';
import {isAuthenticated, logout} from '../helper/jwt';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import { getConfig, getSpinner } from '../helper/helper';

class AuthenticatedComponent extends Component{
    constructor(props){
        super(props);

        this.state={
            user : undefined
        }
    }

    componentDidMount(){
        if(!isAuthenticated()){
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
        if (user === undefined) {
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