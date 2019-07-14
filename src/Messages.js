import { Component } from "react";
import React from "react";

class Messages extends Component {
  deleteMessage(e) {
    e.preventDefault();
    let key = e.target.closest(".Messages-message").dataset.key;
    this.props.deleteMessage(key);
  }

  likeMessage(e) {
    e.preventDefault();
    let checkLike = e.target.classList.contains("liked");
    checkLike
      ? e.target.classList.remove("liked")
      : e.target.classList.add("liked");
    let key = e.target.closest(".Messages-message").dataset.key;
    this.props.likeMessage(key);
  }

  render() {
    const { messages } = this.props;

    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const { member } = this.props;
    const messageFromMe = message.id === member.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    const showAvatar = messageFromMe ? "avatar avatar--hidden" : "avatar";
    const showIcons = messageFromMe ? "icons" : "icons--hidden";
    const showLike = messageFromMe ? "like--hidden" : "like";
    return (
      <li
        key={message.created_at.toString()}
        className={className}
        data-key={message.created_at.toString()}
      >
        <span className={showAvatar}>
          <img src={message.avatar} alt="avatar" />
        </span>
        <div className="Message-content">
          <div className="message-date">
            {
              new Date(message.created_at)
                .toISOString()
                .split("T")
                .join(" ")
                .split(".")[0]
            }
          </div>
          <div className="text">{message.message}</div>
          <div className={showIcons}>
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={e => this.deleteMessage(e)}
            />
            <i className="fa fa-edit" aria-hidden="true" />
          </div>
          <div className={showLike} onClick={e => this.likeMessage(e)}>
            <i className="fa fa-thumbs-up" />
          </div>
        </div>
      </li>
    );
  }
}

export default Messages;
