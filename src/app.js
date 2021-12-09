// items array that contains all todo items
// JSON.parse is used to parse the stringified items from localStorage
// if localStorage is empty, make the items variable an empty array
var items = JSON.parse(localStorage.getItem('game-list')) || [];

// function to add item to the items array
function addGame() {
  // get the value of the input box with querySelector
  var inputBox = document.querySelector('#gameTitle');
  var item = inputBox.value
  
  // If input box is empty, return and alert the user
  // You can also do some more validation if here if you want
  if (item === "")
    return alert("You need enter a Game Title");

  // If input is valid, add item to items array
  items.push({
    value: item,
    time: (new Date()).toLocaleDateString("en-US")
  })
  
  // then convert to a string with JSON.stringify and save to localStorage
  localStorage.setItem('game-list', JSON.stringify(items));
  
  // call function to list all items
  listGames();
  
  // clear input box
  inputBox.value = "";
}

// function to remove item from array with Array.splice()
// removes item, then saves new items array to localStorage
function deleteGame(index) {
  items.splice(index, 1);
  localStorage.setItem('game-list', JSON.stringify(items))
  listGames();
}

// function that generates list of items and populates the html
function listGames() {
  var list = "";
  for (var i = 0; i < items.length; i++) {
    list += "<li>";
    list += items[i].value + " ";
    list += "<small>"+ items[i].time +"</small> ";
    list += "<span class='btn btn-danger' onclick='deleteGame("+ i +")'>delete</span></li>";
    
  }
  document.querySelector("#games-list").innerHTML = list;
}

function showGame() {
    var randomGame = items[Math.floor(Math.random() * items.length)];
    document.querySelector("#gameToPlay").innerHTML = randomGame.value;
}

// function to run when page loads
(function() {
  listGames();
})();
