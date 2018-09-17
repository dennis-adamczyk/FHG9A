$(document).ready(function() {

  $.getJSON('js/result.json', function(result, textStatus) {
    if(result.voted.includes(ip_adress)) {
      window.location.replace('/berlin/vote/results/');
    } else if(result.voted.length >= 24) {
      window.location.replace('/berlin/vote/results/');
    } else {
      $('div.content div.voting button').click(function(event) {
        var value = $("input:radio:checked").val();
        if(value == undefined) {
          alert('Du musst erst ein Abschlusspulli/-shirt auswählen');
        } else {
          $.getJSON('js/result.json', function(result, textStatus) {
            result.voting[value]++;
            result.voted.push(ip_adress);
            $.ajax({
              url: 'system/setResult.php',
              type: 'POST',
              data: {data: JSON.stringify(result)},
              success: function(callback) {
                if(callback == 'ERROR') {
                  alert('Es ist ein Fehler aufgetreten!');
                } else {
                  window.location.replace('/berlin/vote/results/');
                }
              }
            });
          });
        }
      });
    }
  });

});
