$(document).ready(function () {
  // create the editor
  var container = document.getElementById("jsoneditor");
  var options = {
    onChange: function() {
      setAssignments(editor.get());
    }
  };
  var editor = new JSONEditor(container, options);

  // set json
  var json = getAssignments();
  editor.set(json);

  function getAssignments() {
    var output = null;
    $.ajaxSetup({
      async: false
    });
    $.getJSON("/news/pages/english-assignments/js/assignments.json",
      function (data, textStatus, jqXHR) {
        output = data;
      }
    );
    return output;
  }

  function setAssignments(jsonCode) {
    $.ajax({
      type: "POST",
      url: "/news/pages/english-assignments/system/setAssignments.php",
      data: {"data": JSON.stringify(jsonCode)},
      success: function (response) {
        console.log(response);
      }
    });
  }

});