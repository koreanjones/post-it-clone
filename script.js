
var postItNotes = {
    notes: [],
    addNote: function(newNote){
        this.notes.push({
            newNote: newNote,
            completed: false
        });
        view.displayNotes();
    },
    changeNote: function(position, replacementNote){
        this.notes[position] = replacementNote;
        view.displayNotes();
    },
    deleteNote: function(position){
        this.notes.splice(position, 1);
        view.displayNotes();
    },
    toggleComplete: function(position){
        if(this.notes[position].completed === true){
            this.notes[position].completed = false;
        } else {
            this.notes[position].completed = true;
        }
        view.displayNotes();
    },
    toggleAll: function(){
        var allToggle = null;
        var postIts = this.notes.length;

        this.notes.forEach(function(note){
            if(note.completed === true){
                allToggle++;
            }
        });

        this.notes.forEach(function(note){
            if (allToggle === postIts){
                note.completed = false;
            } else {
                note.completed = true;
            }
        });
        
        view.displayNotes();
    }
};

var handler = {
    displayNotes: function(){
        view.displayNotes();
    },
    toggleAll: function(){
        postItNotes.toggleAll();
    }, 
    add: function(){
        var input = document.getElementById('addPostItNote');
        if (postItNotes.notes.length === 10){
            alert("Cant add anymore!");
        } else {
            if(input.value === ""){
                alert("Input Empty");
            } else {
            postItNotes.addNote(input.value);
            input.value = '';
            }
        }
    },
    deleteNote: function(position){
        postItNotes.deleteNote(position);
    }
};

var view = {
    displayNotes: function(){
        var postItUl = document.querySelector('ul');
        postItUl.innerHTML = '';
        

        postItNotes.notes.forEach(function(note,position){
            var postItLi = document.createElement('li');
            noteCompleted = '';

            if (note.completed === true) {
                    noteCompleted = note.newNote;
                    postItLi.style.textDecoration = "line-through";

                } else {
                    noteCompleted = note.newNote;
                }
            postItLi.id = position;
            postItLi.className = "li";
            postItLi.textContent = noteCompleted;
            postItLi.appendChild(this.createDeleteButton());
            postItUl.appendChild(postItLi);
            
        }, this);
    },
    createDeleteButton: function(){
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    eventHandlers: function(){
        var postItUl = document.querySelector('ul');
        postItUl.addEventListener('click', function(event){
            var elementClicked = event.target;
            if(elementClicked.className === 'deleteButton'){
                handler.deleteNote(parseInt(elementClicked.parentNode.Id));
            }
            if(elementClicked.className === 'li'){
                postItNotes.toggleComplete(elementClicked.id);
            } 
        });
    }
};

view.eventHandlers();