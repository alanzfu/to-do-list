var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // an array of incomplete tasks
var completeTaskHolder = document.getElementById("completed-tasks"); //an array of complete tasks

console.log(incompleteTaskHolder);

//New Task List Item
var createNewTaskElement = function(taskString){
   //creates the item in the list
  var listItem = document.createElement("li");
  
   //creates all the elements within the item such as the lablel, button, etc
  var checkBox = document.createElement("input");
  var label = document.createElement("label");;
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  //Each element, needs to be modified and gets values

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  //the label gets the value that was typed by the user
  label.innerText = taskString;
  
  //the created elements(which were not in the DOM), are then added to the DOM
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  //returns the listItem with all children associated with it    
  return listItem;
}


//Add a new task
var addTask = function(){
  var holder = taskInput.value;
  
  //only adds task if there is something to add
  if(holder.length>0){
    //creates new task item with taskInput element
    var listItem = createNewTaskElement(taskInput.value);
    //adds the new task to the incomplete list
    incompleteTaskHolder.appendChild(listItem);
    //binds the events to JS variables to be used
    bindTaskEvents(listItem,taskCompleted);
    //resets the input value to blank
    taskInput.value = "";
    
  };
}
     

//Edit existing task
var editTask = function(){
  console.log("editing task");
  //editTask is from clicking the button, therefore need to edit parent that holds it
  var listItem = this.parentNode;
  
  //querySelector returns the first element that matches that CSS class
  var editInput = listItem.querySelector("input[type=text]");
  var editButton = listItem.querySelector("button");
  var label = listItem.querySelector("label");
  
  //seeing if the listItem is in editMode
  var containsClass = listItem.classList.contains("editMode");
  if(containsClass){
    //if parent is .editMode (class)
    //switch from .editMode
    //label text become the inputs value
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  }
  else {
    //else
    //switch to .editmode
    //input value becomes the label's text
    editInput.value = label.innerText;
    editButton.innerText = "Done";
  }
  listItem.classList.toggle("editMode");
  
    
  
}
  

//Delete existing task
var deleteTask = function(){
  confirm("Delete Task");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}
  //WHen delete button is pressed
    //remove the parent list item from the ul

//Mark Task as complete (should delete from one body and add to another one)
var taskCompleted = function(){
  console.log("Task Complete");
  var listItem = this.parentNode;
  completeTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete); //!!!! A little lost here....
  
}
   //when checkbox is checked
   //append the task list item to the #completed-tasks

//Mark a task as incomplete
var taskIncomplete = function(){
  console.log("Task Incomplete");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem); 
  bindTaskEvents(listItem, taskCompleted);//!!!!! basicaly calling taskcomplted on listitem to append it onto taskcompleted

}
  //when the checkbox is unchecked
  //append the task list item to the #incomplete-tasks


addButton.onclick = addTask;
//addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log(taskListItem);//select its children
    //select list item's children
    var checkBox =taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
    editButton.onclick = editTask;
    
    //bind deleteTask to the delete button
    deleteButton.onclick = deleteTask;
  
    //bind taskCompleted to teh checkbox
    checkBox.onchange = checkBoxEventHandler;
  
}


//cycle over incompleteTaskHOlder ul list items
  for(var i = 0;i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
  }
    //bindTaskEvent to list item children (taskCompleted)

//cycle over completeTaskholder ul list items
  for(var i = 0;i<completeTaskHolder.children.length;i++){
    bindTaskEvents(completeTaskHolder.children[i], taskIncomplete);
  }
  //for each list item
    //bind events to list items children














