//Sidharth Shekhar

var events = []; //array that holds all events



//Function to generate random 'world' of coordinates between -10 and +10 for both Y and X axes
function createRandomCoordinates() {
    var coordinates_world = [];
    for (var i = 0; i < 200; i++) {
        var min = -10;
        var max = 10;
        var x_coordinate = Math.floor(Math.random() * (max - min) + min);
        var y_coordinate = Math.floor(Math.random() * (max - min) + min);
        var coordinates = [x_coordinate, y_coordinate];

        //Check to ensure that the same set of coordinates doesn't already exist in the world of coordinates
        var string_coordinates_world = JSON.stringify(coordinates_world);
        var string_coordinates = JSON.stringify(coordinates);
        var check_coordinates = string_coordinates_world.indexOf(string_coordinates);
        if (check_coordinates == -1) {
            coordinates_world.push(coordinates);
        }

    }
    return coordinates_world;
}



//Function to randomly generate tickets and their prices
function createRandomTickets() {
    var ticket_array = [];
    //Randomize number of tickets (assuming a max of 50 tickets per event)
    var random_numberof_tickets = Math.floor(Math.random() * 50);
    for (var n = 0; n < random_numberof_tickets; n++) {

        //Randomize ticket prices (non-zero) assuming max of 20
        var random_ticket_price = Math.floor(Math.random() * 20 + 1);
        ticket_array.push(random_ticket_price);
    }
    return ticket_array;
}



//Function to randomly generate events within the world of coordinates
function createEvents() {
    var generated_coordinates = createRandomCoordinates()
    //Assumes a maximum of 100 events
    for (var i = 0; i < Math.floor(Math.random() * 100); i++) {
        var new_event = {
            id: i,
            location: generated_coordinates[i],
            tickets: createRandomTickets()
        }
        events.push(new_event);
    }
}




// Calcuating Manhattan distance between two points
function calculateDistance(location1, location2) {
    return Math.abs((location1[0] - location2[0])) + Math.abs((location1[1] - location2[1]));
}


//Calculate the cheapest ticket from a given array of tickets
function cheapestTicket(tickets) {
    var len = tickets.length;
    var min = Infinity;

    if (len != 0) {
        while (len--) {
            if (tickets[len] < min) {
                min = tickets[len];
            }
        }
        return min;
    } else {
        return "No tickets available"
    }
}


//Compute the list of the five closest events and display them to user
function fiveClosest() {
    var sorted_events = [];
    var user_x_coordinate = document.getElementById("x_coordinate").value
    var user_y_coordinate = document.getElementById("y_coordinate").value
    var user_location = [user_x_coordinate, user_y_coordinate]
    for (var n = 0; n < events.length; n++) {
        sorted_events.push({
            event_identifier: events[n].id,
            event_distance: calculateDistance((events[n].location), user_location),
            event_cheapest_ticket: cheapestTicket(events[n].tickets)
        })
    }
    sorted_events.sort(function(a, b) {
        return parseFloat(a.event_distance) - parseFloat(b.event_distance);
    });

    var five_closest = sorted_events.slice(0, 5)

    //Display five closest events to user
    var output = "Closest Events to: (" + user_x_coordinate + "," + user_y_coordinate + ") : \n \n"
    for (var p = 0; p < five_closest.length; p++) {
        var ticket_value = (five_closest[p].event_cheapest_ticket == "No tickets available") ? "No tickets available" :
            "$" + five_closest[p].event_cheapest_ticket;
        output += "Event: " + five_closest[p].event_identifier +
            " - Cheapest Ticket: " + ticket_value +
            " | Distance: " + five_closest[p].event_distance + "\n";
    }
    alert(output);

}
