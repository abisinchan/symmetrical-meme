// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function() {

   // updating the calendar's time blocks based on the current hour.
  function updateCalendar() {
    var currentHour = dayjs().format('H'); //H = hour in 24hr format from day.js

    // Apply the past, present, or future class to each time block, depending what hour it is, the class will exchange and bg will also change. Styling is in css. 
    $('.time-block').each(function() {
      // converts string to number
      var id = $(this).attr('id');
      var timeBlockHour = Number(id.slice(id.indexOf('-') + 1));
      if (timeBlockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (timeBlockHour === parseInt(currentHour)) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Create time blocks from 9 AM to 5 PM in 24hr format
  //Copied specs from example blocks in inital assignment that was issued 
  for (var i = 9; i <= 17; i++) {
    var timeBlock = $('<div>').attr('id', 'hour-' + i).addClass('row time-block');
    var hourColumn = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(formatHour(i));
    var descriptionTextarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
      .append($('<i>').addClass('fas fa-save').attr('aria-hidden', 'true'));

    timeBlock.append(hourColumn, descriptionTextarea, saveButton);
    $('.container-lg.px-5').append(timeBlock);
  }

  // Add a click event listener to the save button. Will store user input in storage.
var saveButtons = document.getElementsByClassName('saveBtn');
for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener('click', function() {
    var timeBlock = this.parentNode; // Get the parent time block element
    var timeBlockId = timeBlock.getAttribute('id'); // Get the time block's id
    var userInput = timeBlock.querySelector('.description').value;
    localStorage.setItem(timeBlockId, userInput);
  });
}

  // Retrieve user input from localStorage and set textarea values
var timeBlocks = document.getElementsByClassName('time-block');

for (var i = 0; i < timeBlocks.length; i++) {
  var timeBlock = timeBlocks[i];  // Get the current time block
  var timeBlockId = timeBlock.getAttribute('id');  // Get the time block's id
  var userInput = localStorage.getItem(timeBlockId);
  // Find the description field within the time block
  var descriptionField = timeBlock.querySelector('.description');
  // Set the value of the description field to the retrieved user input
  descriptionField.value = userInput;
}


  // Display the current date in the header of the page
  var currentDate = dayjs().format('MMMM D, YYYY');
  $('#currentDay').text(currentDate);

  // Helper function to format the hour labels
  function formatHour(hour) {
    return dayjs().hour(hour).format('hA');
  }

  // Updates the calendar every minute to sync with the current time
  setInterval(function() {
    updateCalendar();
  }, 60000); // 60000 milliseconds = 1 minute

  // Initial call to update the calendar on page load
  updateCalendar();
});

