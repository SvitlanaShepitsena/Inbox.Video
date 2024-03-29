'use strict';

var React = require('react');
var ActionCreator = require('../actions/HeisenbergActionCreators');
var Constants = require('../constants/AppConstants');

var Welcome = React.createClass({
  handleAuthResult: function() {
    setTimeout(function() {
      ActionCreator.fetchSubscriptions();
      ActionCreator.initLikesPlaylist();
    }, 2000);
  },
  handleClick: function() {
    gapi.load('auth2', function() {
      var auth2 = gapi.auth2.init(Constants.AuthObj);
      auth2.signIn().then(function() {
        var profile = auth2.currentUser.get().getBasicProfile();
        var obj = {
          email: profile.getEmail(),
          name: profile.getName(),
          avatar: profile.getImageUrl(),
          id: profile.getId()
        };
        ActionCreator.getToken();
        ActionCreator.createIdentity(obj);
        this.handleAuthResult();
      }.bind(this));
    }.bind(this));
  },
  render() {
    return (
      <div className="channel-center form">
        <div className="inner-form">
          <h1 className="name" title="Yep, we don't have a logo.">Inbox.Video</h1>
          <ul className="feature-list">
            <li>Watch status for every single video</li>
            <li>Manage subscriptions</li>
            <li>Like a video</li>
            <li>Sync to Youtube</li>
            <li>Super fast</li>
          </ul>
          <a href="javascript:void(0)" id="signin-button" className="button button-signin" onClick={this.handleClick}></a>
        </div>
      </div>
    );

  }
});

module.exports = Welcome;
