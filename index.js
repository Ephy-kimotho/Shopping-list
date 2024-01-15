
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" 

const appSettings = {
    databaseURL: "https://realtime-database-9b36d-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)

    clearInputField()
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let items = Object.entries(snapshot.val())

        clearShoppingList()

        for (let i = 0; i < items.length; i++){
            let currentItem = items[i];
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            renderListItems(currentItemID,currentItemValue)
        }
    } else {
        shoppingListEl.innerHTML = "No items here yet..."
    }
})

function clearInputField(){
    inputFieldEl.value = "";
}

function clearShoppingList(){
    shoppingListEl.innerHTML = ""
}

function renderListItems(itemID, itemValue){
    let newEl  = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", () => {

        let locationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(locationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}