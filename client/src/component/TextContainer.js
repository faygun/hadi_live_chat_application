import React,{Component} from 'react';
import axios from 'axios';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
   } from 'reactstrap';
import { getConfig, getUser } from '../helper/jwt';
export default class TextContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            message : ""
        }
    }
    sendMessage(){
        if(!this.state.message || !this.props.channel_id)return;

        const user = getUser();
        var request = {message : this.state.message, channel_id : this.props.channel_id, name:user.name};
        const body = JSON.stringify(request);

        axios.post('/api/channel/send', body, getConfig())
        .then(res => {
            console.log(res);
            this.setState({message:''});
        })
        .catch(err => {
            console.log(err);
        });
    }
    render(){
        return(
            <div className="text-container">
                 <InputGroup>
                    <Input className="text-left" value={this.state.message} onChange={(e)=>{
                        this.setState({message:e.target.value})
                    }} onKeyDown={(e)=>{if(e.key === 'Enter') this.sendMessage();}} placeholder="type message"/>
                    <InputGroupAddon addonType="append">
                        <Button onClick={()=>this.sendMessage()}>Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}