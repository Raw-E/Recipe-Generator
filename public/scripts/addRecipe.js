document.getElementById('submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default form submission

  var jsonData = document.getElementById('json-input').value;
  var messageElement = document.getElementById('message');

  try {
    // Assuming the user enters valid JSON in the 'json-input' field
    var data = JSON.parse(jsonData);

    // Send the JSON data to your server endpoint
    fetch('http://localhost:3000/add-recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      messageElement.textContent = 'Recipe submitted successfully!';
      messageElement.style.color = 'green';
      messageElement.style.fontWeight = 'bold';
      document.getElementById('json-input').value = ''; // Clear the input on success
    })
    .catch(error => {
      messageElement.textContent = 'Error inserting data. Please try again.';
      messageElement.style.color = 'red';
      messageElement.style.fontWeight = 'bold';
      console.error('Error inserting data:', error);
    });
  } catch (e) {
    messageElement.textContent = 'Invalid JSON. Please check your data.';
    messageElement.style.color = 'red';
    messageElement.style.fontWeight = 'bold';
    console.error('Parsing error:', e);
  }
});
  
document.getElementById('clear-btn').addEventListener('click', function() {
  document.getElementById('json-input').value = ''; // This will clear the textarea
  document.getElementById('message').textContent = ''; // Optionally clear the message area
});

