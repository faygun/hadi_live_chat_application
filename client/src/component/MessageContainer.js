import React,{Component} from 'react';
import '../Channel.css';
import TextContainer from './TextContainer';
import Message from './Message';
import axios from 'axios';
import { getConfig, getUser } from '../helper/jwt';
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
        axios.post('/api/channel/message', {channel_id : this.props.active_channel, user_id: getUser().id}, getConfig())
        .then(res => {
            this.setState({messages:res.data})
        })
        .catch(err => {
            this.setState({error:err.error});
        });
    }
    componentDidMount(){
        this.getMessages();
    }

    render(){
        return(
            <div className="message-container">
                <Message messages={this.state.messages}/>
                <TextContainer channel_id={this.props.active_channel}/>
            </div>
        )
    }
}