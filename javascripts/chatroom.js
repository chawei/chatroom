(function($) {
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }       
    return str;
  }

  function ChatRoom(name, containerId, duration) {
    this.container = $(containerId);
    this.container.streams = $(containerId + " .user_stream .msgs");

    this.periodTime  = 15;
    this.periodSpace = 75; // this should match the space in css file
    this.secSpace    = this.periodSpace / this.periodTime;
    this.startTime   = this.currentSecs(); 
    this.drawTimeline(duration);
  }

  ChatRoom.prototype.currentSecs = function() {
    return Math.floor(new Date().getTime() / 1000);
  }

  ChatRoom.prototype.drawTimeline = function(duration) {
    var timeline = $('.timeline', this.container);
    timeline.empty();
    while (duration >= 0) {
      displayTime = Math.floor(duration / 60) + ":" + pad((duration % 60).toFixed(), 2);
      timeline.append("<div class='time'><div class='display'><div class='inner'>"+displayTime+"</div></div><div class='block'></div></div>");
      duration -= this.periodTime;
    }
  }

  ChatRoom.prototype.addMessage = function(data) {
    var index   = data.index;
    var message = data.message;
    var msgDOM  = "<div class='msg'>"+message+"</div>";
    var topPos  = this.secSpace * (this.currentSecs() - this.startTime);
    var msgElem = $(msgDOM);
    msgElem.css('top', topPos + 'px');
    $(this.container.streams[index]).append(msgElem);
  }

  window.chatroom = new ChatRoom('room1', "#chatroom_container", 60*5);

})(jQuery);
