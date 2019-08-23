import React,{Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import { getConfig } from '../helper/jwt';

export default class ChannelBar extends Component{
    constructor(props){
        super(props)

        this.state = {
            channels:[],
            error:''
        };
    }
    
    componentDidMount(){
        axios.get('/api/channel', getConfig())
        .then(res => {
            this.setState({channels:res.data})
        })
        .catch(err => {
            this.setState({error:err.error});
        });
    }
    render(){
        let channelList = this.state.channels ? this.state.channels : [];
        return(
            <div className="channel-bar">
                <p>Channels</p>
                <Nav vertical color="dark" width="25%">
                    {
                        channelList.map(({id,name}) => (  
                            <NavItem>
                                    <NavLink onClick={} channel-id={id} href="#">{name}</NavLink>
                            </NavItem>  
                        ))
                    }
                </Nav>
            </div>
        )
    }
}