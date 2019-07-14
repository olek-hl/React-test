import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentUser: {
        id: "1",
        user: "Sasha",
        avatar: "https://i.pravatar.cc/300?img=14"
      },
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://api.myjson.com/bins/1hiqin")
      .then(response => response.json())
      .then(data => this.setState({ data: data, isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <p className="loader" />;
    }
    return (
      <div className="App">
        <div className="App-header">
          <span className="chat-name">Chat</span>
          <span className="message-count">
            Messages: {this.state.data.length}
          </span>
          <span className="last-message">
            Last message: {this.lastMessageDate()}
          </span>
        </div>
        <Messages
          messages={this.state.data}
          member={this.state.currentUser}
          deleteMessage={this.deleteMessage.bind(this)}
          likeMessage={this.likeMessage.bind(this)}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = message => {
    this.setState(prevState => ({
      data: [
        ...prevState.data,
        {
          id: this.state.currentUser.id,
          user: this.state.currentUser.user,
          avatar: this.state.currentUser.avatar,
          created_at: new Date()
            .toISOString()
            .split("T")
            .join(" ")
            .split(".")[0],
          message: message,
          marked_read: false
        }
      ]
    }));
  };

  lastMessageDate = () => {
    let data = this.state.data;
    if (data[data.length - 1]) {
      let date = new Date(data[data.length - 1].created_at)
        .toISOString()
        .split("T")
        .join(" ")
        .split(".")[0];
      return date;
    }
  };

  deleteMessage(key) {
    let data = this.state.data;
    this.setState({
      data: data.filter(e => e.created_at !== key)
    });
  }

  likeMessage(key) {
    let data = this.state.data;
    data.forEach(m => {
      if (m.created_at === key) {
        m.liked ? (m.liked = false) : (m.liked = true);
      }
    });
    console.log(data);
    this.setState({
      data: data
    });
  }
}

export default App;
