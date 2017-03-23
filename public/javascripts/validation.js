function validateTaskForm() {

	var checkCount = 0;

	var getTaskName = document.getElementById('taskName').value;
	var getTaskDetails = document.getElementById('taskDetails').value;
	var getTaskDate = document.getElementById('taskDate').value;

	var errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n"

	if (getTaskName === "") {
		errorMessage += "Task Name\n";
	}
	else {
		checkCount++;
	}

	if (getTaskDetails === "") {
		errorMessage += "Task Details\n";
	}
	else {
		checkCount++;
	}

	if (getTaskDate === "") {
		errorMessage += "Task Date\n";
	}
	else {
		checkCount++;
	}


	if(checkCount === 4) {
		return true;
		checkCount = 0;
	}
	else {
		alert(errorMessage);
		return false;
		checkCount = 0;
		errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n";
	}
}

function confirmDelete() {
	alert("This item will be permanently deleted.")
}

function fieldValidate() {
	var password = document.getElementById('password').value;
	var username = document.getElementById('username').value
	var email = document.getElementById('email').value;

	var checkCount = 0;

	var errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n";

	if(username === "") {
		errorMessage += "Username - this field must not be empty!\n"
	}
	else if(username.length < 6) {
		errorMessage += "Username - Should contain 8 characters or more!\n"
	}
	else {
		checkCount++;
	}

	if (username != "") {
		if(checkUserName() === false) {
			errorMessage += "Username - should not contain any numbers or special characters!\n";
		}
		else {
			checkCount++;	
		}	
	}
	else {
		checkCount++;
	}

	if(email === "") {
		errorMessage += "Email - this field must not be empty!\n"
	}
	else {
		checkCount++
	}

	if(password === "") {
		errorMessage += "Password - this field must not be empty!\n";
	}
	else {
		checkCount++;
	}

	if(checkCount === 4) {
		return true;
		checkCount = 0;
	}
	else {
		alert(errorMessage);
		return false;
		checkCount = 0;
		errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n";
	}
}

function checkUserName() {
    var username = document.getElementById("username").value;
    var pattern = new RegExp(/[~.`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/); //can not be accepted
    if (pattern.test(username)) {
        return false;
    }
    return true;
}

function forSearching(){
	localStorage.setItem("search", document.getElementById('search').value);

}

if(window.location.pathname === '/videos') {

	console.log(localStorage.getItem("search"));

	if(localStorage.getItem("search")=== 'null' || localStorage.getItem("search") === null) {
		fetch('api/v1/entry?sort=videoDate').then(function(res){
			res.json().then(function(entry){
					console.log('entry', entry);
					var tbody = document.getElementById('data');
					entry.forEach(function(entry){
					tbody.insertAdjacentHTML('beforeend', '<tr><td>'  + entry.videoTitle + '</td><td>' + entry.videoCategory + '</td><td>' +
					'</td>' + '<td><a href = "/videos/' + entry._id + '", class = "red-text">' + '<input type = "button", class = "btn btn-success", value = "See Video"/>' + '</td></tr>');
				});
			
			});
			});
	
		
			fetch('api/v1/entry/count').then(function(res){
				res.json().then(function(count){
					console.log('count', count)
					var banner = document.getElementById('banner-description');
					banner.innerHTML = 'There are ' + count.count + ' videos';
				});
			localStorage.setItem("search", null);
			});
	}

	else {
		fetch('api/v1/entry?query={"videoTitle":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
			res.json().then(function(result){
				
				if(result.length === 0){
					document.getElementById('allLinks').insertAdjacentHTML('beforeend', '<a href ="/videos"' +
						'style ="text-transform: capitalize"' +
						'white-text">See all videos</a>')

					document.getElementById('banner-description').innerHTML = "No entry found " +
					localStorage.getItem("search");

				}
				else if (result.length === 1){
					document.getElementById('allLinks').insertAdjacentHTML('beforeend', '<a href="/videos"' +
						'style = "text-transform: capitalize" ' +
						'white-text">See all videos</a>')

					document.getElementById('banner-description').innerHTML = "Found: " + result.length +
					"entry related to " + localStorage.getItem("search");
				}

				else {

					document.getElementById('allLinks').insertAdjacentHTML('beforeend', '<a href = "/videos"' +
						'style = "text-transform: capitalize" class = "waves-effect waves-light btn-flat center black' +
						'white-text">See all videos</a>')

					document.getElementById('banner-description').innerHTML = "Found " + result.length +
					" entries" + localStorage.getItem("search");
				}

				var tbody = document.getElementById('data');
				result.forEach(function(result){
					tbody.insertAdjacentHTML('beforeend', '<tr><td>'  + result.videoTitle + '</td><td>' + result.videoCategory + '</td><td>' +
				'</td>' + '<td><a href = "/videos/' + result._id + '", class = "red-text">' + '<input type = "button",  class = "btn btn-success", value = "See Video"/>' + '</td></tr>' );
					tbody.insertAdjacentHTML('beforeend', 'br' );
				});
				localStorage.setItem("search", null);
				});
			});

	}
}