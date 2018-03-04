// user uuid for counting unique page views
var user_uuid = getCookie('user_uuid'); 

// user tracking data collection
var td = [];

// Connect to tracking our server
var socket = io.connect('http://mon.net:3001');


/**
 * Monitoring setup, set user_uuid if not set
 */
socket.on('setup', function (data) {
  if (!user_uuid) {
    user_uuid = data.uuid;
    setCookie('user_uuid', user_uuid, 1);
  }

  // After user_uuid is set, we can track page view
  um_page_view();
   
});


/**
 * Track Page view
 */
function um_page_view() {
  
  /**
   * Get query params
   */

  var qs = (function(a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i)
      {
          var p=a[i].split('=', 2);
          if (p.length == 1)
              b[p[0]] = "";
          else
              b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
  })(window.location.search.substr(1).split('&'));


  // Send page view trackign data to server
  socket.emit('page_view', {
    user_uuid: user_uuid,
    url: window.location.href,
    qs: qs,
    t: + new Date(),
  });
}







/**
 * Send User Tracking data once every few seconds
 */
setInterval(function () {
  
  if ( td.length > 0 ){
    socket.emit('td', { 
      user_uuid: user_uuid,
      url: window.location.href,
      td: td.slice()
    });

    td = [];
  }

}, 2000);





// Tracking User Actions

(function() {


    // Mouse move

    document.addEventListener('mousemove', function(event) { 

      td.push({
        t: + new Date(),
        e: 'mousemove',
        x: event.pageX,
        y: event.pageY
      });

    });
    

    // Mouse clicks

    document.addEventListener('mousedown', function(event) { 
    
      td.push({
        t: + new Date(),
        e: 'mousedown',
        x: event.pageX,
        y: event.pageY,
        btn: event.which
      });

    });


    // User writing

    document.addEventListener('keyup', function(event) { 
      
      var target = event.target || event.srcElement

      td.push({
        t: + new Date(),
        e: 'keyup',
        name: target.name,
        val: target.value,
        path: getDomPath(target).join(' > ')
      });

    });

})();






// Helper functions

function getDomPath(el) {
  var stack = [];
  while ( el.parentNode != null ) {
    var sibCount = 0;
    var sibIndex = 0;
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if ( el.hasAttribute('id') && el.id != '' ) {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if ( sibCount > 1 ) {
      stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }
  return stack.slice(1); // removes the html element
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}