import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "YOUR-DATABASE-URL"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shopArray = Object.entries(snapshot.val())

    clearShoppingList()
    // console.log(snapshot.val())

    shopArray.forEach(item => {
      appendItemToShoppingList(item)
    });

    // console.log(shopArray)
  }else{
    shoppingListEl.innerHTML = "No items yet..."
  }
})

addButtonEl.addEventListener("click", function () {
  let inputVal = inputFieldEl.value

  if (inputVal != "") {
    push(shoppingListInDB, inputVal)

    clearInputField()
    console.log(inputVal + " Added to database")
  }
});

function appendItemToShoppingList(inputVal) {
  let newEl = document.createElement("li")
  newEl.textContent = inputVal[1]

  newEl.addEventListener("dblclick", function () {
    let delShoppingItem = ref(database, `shoppingList/${inputVal[0]}`)
    remove(delShoppingItem)
  })

  shoppingListEl.append(newEl)
}


function clearInputField() {
  inputFieldEl.value = ""
}

function clearShoppingList() {
  shoppingListEl.innerHTML = ""
}