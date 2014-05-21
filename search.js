// After the API loads, call a function to enable the search box.

function onClientLoad() {

    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    //$('#search-button').attr('disabled', false);
    
}
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('Your API key here!');
    search();
    // Add code here to test out showResponse():
    //showResponse("Hooray");
}
// Search for a specified string.
function search() {
  var q = document.getElementById('srcpar').value;
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 5
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
  
    var respOb = JSON.parse(str);
    var titles = new Array();
    var videod = new Array();
    var photo = new Array();
    var items = respOb.items;
      for(var i=0; i<items.length;i++){
    titles.push(items[i].snippet.title);
    videod.push(items[i].id.videoId);
    photo.push(items[i].snippet.thumbnails.default.url);
      } 

      var temp="";
      for(var x=0;x<items.length;x++)
      {
        var list = titles[x];
        var list1 = "http://www.youtube.com/watch?v=" + videod[x];
        var source= photo[x];
        temp+="<li><img src='" + source + "' width='100' height='100'></img><b>" + list + "</b>, Link: " + "<a target='blank' href='"+list1+"'>" + list1 + "</a>" +"</li>";
      }
      var MyList = document.getElementById('groups');
      MyList.innerHTML = temp;
    /*for(var i=0; i<items.length; i++){      
    $('#groups').html('<li>' + titles[i] + '</li>');
  }*/


  });
}
