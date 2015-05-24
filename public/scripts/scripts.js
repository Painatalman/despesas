$(document).ready(function() {
    $('select').material_select();
  });


  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    formatSubmit: 'yyyy-mm-dd',
    closeOnSelect: true,
    closeOnClear: true,
    // onStart: function () {
    //   var date = new Date();
    //   this.$node[0].dataset.value = date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString();
    // }
  });
