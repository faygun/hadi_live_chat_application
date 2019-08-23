import React,{Component} from 'react';
import '../Channel.css';
import ChannelBar from './ChannelBar';
import TextContainer from './TextContainer';
import Message from './Message';
export default class MessageContainer extends Component{

    render(){
        return(
            <div className="message-container">
                <Message/>
                <TextContainer/>
            </div>
        )
    }
}