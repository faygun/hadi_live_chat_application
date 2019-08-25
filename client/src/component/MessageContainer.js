import React,{Component} from 'react';
import '../Channel.css';
import Message from './Message';
import axios from 'axios';
import { getConfig, getUser } from '../helper/jwt';
import io from "socket.io-client";

export default class MessageContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[],
            error:""
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.active_channel !== prevProps.active_channel) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
          this.getMessages();
        
        }
      }

      getMessages(){
        if(!this.props.active_channel) return;
        axios.post('/api/channel/message', {channel_id : this.props.active_channel}, getConfig())
        .then(res => {
            this.setState({messages:res.data})
        })
        .catch(err => {
            this.setState({error:err.error});
        });
    }
    
    componentDidMount(){
        this.getMessages();
        const socket = io("http://localhost:5000");
        socket.on("received", (res) => {
            if(res && res.data){
                let messages = this.state.messages;
                let data = res.data;
                if(data.channel_id !== this.props.active_channel)return;
                if(data.users.indexOf(getUser().id) === -1)return;
                messages.push({
                    message_id : data.message_id,    
                    message:data.message,
                    time:data.time,
                    user_id : data.user_id,
                    user_name:data.name
                });

                this.setState({messages:messages});
            }
            else{
                if(res.user_id === getUser().id)
                    alert(res.error)
            }
        } );

    }
    render(){
        return(
            <div className="message-container">
                <Message  channel_id={this.props.active_channel} messages={this.state.messages}/>
            </div>
        )
    }
}