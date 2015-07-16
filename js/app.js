var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // an array of incomplete tasks
var completeTaskHolder = document.getElementById("completed-tasks"); //an array of complete tasks

console.log(incompleteTaskHolder);

//New Task List Item
var createNewTaskElement = function(taskString){
   
  var listItem = document.createElement("li");
  
  var checkBox = document.createElement("input");
  var label = document.createElement("label");;
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  //Each element, needs to be modified
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
       
  return listItem;
}


//Add a new task
var addTask = function(){
  var holder = taskInput.value;
  
  if(holder.length>0){
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    taskInput.value = "";
    
  };
}
     

//Edit existing task
var editTask = function(){
  console.log("editing task");
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var editButton = listItem.querySelector("button");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  if(containsClass){
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  }
  else {
    editInput.value = label.innerText;
    editButton.innerText = "Done";
  }
  listItem.classList.toggle("editMode");
  
    
  
}
  //when the edit button is pressed
  //if parent is .editMode (class)
    //switch from .editMode
    //label text become the inputs value
  //else
    //switch to .editmode
    //input value becomes the label's text
  

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














