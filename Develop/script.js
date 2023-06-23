



  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
  $(document).ready(function() {


  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage.
    $('.saveBtn').on('click', function() {
      var timeBlockId = $(this).closest('.time-block').attr('id');
      var userInput = $(this).siblings('.description').val();
      localStorage.setItem(timeBlockId, userInput);
    });
  // TODO: Add code to get any user input that was saved in localStorage and set
    $('.time-block').each(function() {
      var timeBlockId = $(this).attr('id');
      var userInput = localStorage.getItem(timeBlockId);
      $(this).find('.description').val(userInput);
    });


  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
          $('.time-block').each(function() {
            var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
            if (timeBlockHour < currentHour) {
              $(this).removeClass('present future').addClass('past');
            } else if (timeBlockHour === currentHour) {
              $(this).removeClass('past future').addClass('present');
            } else {
              $(this).removeClass('past present').addClass('future');
            }
          });
        }

        setInterval(function() {
          updateCalendar();
        }, 60000); // 60000 milliseconds = 1 minute
      
  

  });
