function include(url, callback)
{
  var script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.onreadystatechange = callback;
  script.onload = callback;
  document.getElementsByTagName('head').item(0).appendChild(script);
}

// Load socket.io dependency
include('http://mon.net:3001/socket.io/socket.io.js', function () {
  
  // Load Monitoring App
  include('http://mon.net:3001/mon_client.js');

});
