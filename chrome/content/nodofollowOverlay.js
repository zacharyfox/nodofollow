// Thanks to Chris Pederick, author of the Web Developer Toolbar, from whom I shamelessly stole code.

// Listen for page loads to make sure we are applying the highlighting to new pages if NoDoFollow is active
window.addEventListener('load', function() { NoDoFollow.init(); }, false);

var NoDoFollow = {
  
  init: function() {
    var appcontent = document.getElementById("appcontent");   // browser
    if (appcontent) {
      appcontent.addEventListener('DOMContentLoaded', this.onPageLoad, true);
    }
  },

  toggleHighlight: function(element) {
    NoDoFollow.active *= -1;
    if(NoDoFollow.active == 1){
      this.highlight();
    } else {
      this.unHighlight();
    }
  },

  onPageLoad: function(aEvent) {
    if (NoDoFollow.active == 1){
      NoDoFollow.highlight();
    } 
  },

  unHighlight: function() {
    this.setMenuItems(false);

    var num = gBrowser.browsers.length;
    for (var i = 0; i < num; i++){
      var objContentWindow = gBrowser.getBrowserAtIndex(i).contentWindow;
      var objDocument = objContentWindow.document;
      var linkElement = objDocument.getElementById('nodofollowstylesheet');
      if (linkElement) {
        objDocument.getElementsByTagName("head")[0].removeChild(linkElement); 
      }
    }
  },

  highlight: function() {
    this.setMenuItems(true);

    // NoDoFollow is global now, highlight every open page
    var num = getBrowser().browsers.length;
    for (var i = 0; i < num; i++) {
      var objContentWindow = gBrowser.getBrowserAtIndex(i).contentWindow;
      var objDocument = objContentWindow.document;
      var linkElement = null;
      // Is this page highlighted already?
      if (objDocument.getElementById('nodofollowstylesheet') == null) {
        linkElement  = objDocument.createElement("link");
        linkElement.setAttribute("href", "chrome://nodofollow/content/stylesheets/nodofollow.css");
        linkElement.setAttribute("id", "nodofollowstylesheet");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("type", "text/css");
        objDocument.getElementsByTagName("head")[0].appendChild(linkElement);
      }
    }
  },

  setMenuItems: function(value) {
    var toolspopup = document.getElementById('nodofollow_toolspopup');
    var rightclick = document.getElementById('nodofollow_rightclickmenu');
    // Set all the checkboxes
    toolspopup.setAttribute('checked', value);
    rightclick.setAttribute('checked', value);
  }
}

NoDoFollow.active = -1;
