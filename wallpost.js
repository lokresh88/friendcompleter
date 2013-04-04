function toggleContent() {
  FB.getLoginStatus(function(response) {
    pickerDiv = $('#picker');
    if (response.status == 'connected') {
      pickerDiv.html("<div class='prompt'>Type a friend\'s name to select them for wall post.</div><div id='selector'><div id='selectorInput' style='display: inline-block; height:48px;'><input id='fbAutocomplete' size=50 style='font-size: 18px;' /></div><div id='postButton' display='none' style='display: none;'><a id='postButtonLink' href='#'>Post to Wall</a></div></div>");
      setupFriendCompleter("input#fbAutocomplete");
      
      $('input#fbAutocomplete').bind('autocompleteclose', function(event, ui) {
        var postButton = $('div#postButton');
        $(function() {
          postButton.button();
          postButton.click(function() { doWallPost(); });
        });
        postButton.show('short');
      });

      $('input#fbAutocomplete').focus();

    } else {
      pickerDiv.html('<div class="prompt">Log in to try the friend picker.</div>');
    }
  });
}

function doWallPost() {
  FB.ui(
    {
     method: 'feed',
     name: 'Posting to a friend\'s wall using the pure Javascript friend picker',
     link: 'http://rjacoby.github.com/friendcompleter/',
     caption: 'The joy of using a pure JS friend picker.',
     picture: 'http://2.bp.blogspot.com/-iarq5sjWDWc/TWRxt8nPegI/AAAAAAAAA_0/ABabl2TlOO0/s1600/emu.jpg',
     description: 'This post is coming from a test app using a pure Javascript friend picker. The picker provides typeahead lookup in the browser with no server-side component.',
     to: $('input#fbFriendId').val()
    }
  );
  // return false; // Having this seems to make the dialog keep popping
}
