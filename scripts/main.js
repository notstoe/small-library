let myLibrary = [];
let bookInfo = [];                                                          //array with books title, author, numpages and read status

function createBook(bookInfoArr) {                                          //array with book info: title[0], author[1], pagenum[2], readInput[3]
                                                                            //creates new book object and clears the Arr

    let brandNewBook = new book(bookInfoArr[0], bookInfoArr[1], bookInfoArr[2], bookInfoArr[3]);
    bookInfo = [];
    return brandNewBook;
}


function addToLibrary(bookObj) {

    const libraryBooks = document.querySelector('.books');

    const bookToAdd = document.createElement('div');
        bookToAdd.classList.add('singleBook');
        bookToAdd.setAttribute('id', `book${myLibrary.length - 1}`);
        bookToAdd.setAttribute('data-attribute', `${bookObj.author}`);                              //to link with remove on myLibrary array
        bookToAdd.textContent = bookObj.info();
        
        const removeBtn = document.createElement('img');
        removeBtn.setAttribute('src', 'images/trashcan.png');
        removeBtn.setAttribute('alt', 'black trashcan');
        removeBtn.setAttribute('id', `removeBtn${myLibrary.length - 1}`);
        removeBtn.classList.add('removeBtn');

        removeBtn.addEventListener('click', deleteBook);
        
        bookToAdd.appendChild(removeBtn);
        libraryBooks.appendChild(bookToAdd);
    }

 function deleteBook(e){

    let refNumber = Number(e.target.id.replace('removeBtn',''));
    
    const libraryBooks = document.querySelector('.books');
    const bookToDelete = document.querySelector(`#book${refNumber}`);
    
    refNumberArr = myLibrary.findIndex(element => element.author === bookToDelete.getAttribute('data-attribute'));                     //finds the index for this book on MyLibrary array

    myLibrary.splice(refNumberArr,1);
    
    libraryBooks.removeChild(bookToDelete);
 }


function book(title, author, pageNum, read) {                                               //constructor

    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.read = read

}

book.prototype.info = function () {

    if (this.read) {

        return `${this.title} by ${this.author}. It has ${this.pageNum} pages and it was already read.`;

    } else {

        return `${this.title} by ${this.author}. It has ${this.pageNum} pages and it was not read yet.`;
    }
}

book.prototype.changeReadStatus = function () {

    this.read == true? this.read = false : this.read == true;

}


// .. :: FORM HANDLING

const form = document.querySelector('form');

function getFormData() {                                                                //gets form Data, adds new book and resets form
    
    const elements = document.querySelectorAll('input');
    elements.forEach(element => {

        if (element.id === 'readInput'){
            bookInfo.push(element.checked);
        } else {
            bookInfo.push(element.value);
        }

    });
    
    myLibrary.push(createBook(bookInfo));                                               //only stores on the array if it was added through the form (to avoid adding duplicates when calling renderLibrary)
    addToLibrary(myLibrary[myLibrary.length-1]);   
    
    elements.forEach(resetForm); 
}

function resetForm(element) {
    
    if (element.id === 'readInput') {
        return;
        
    } else if (element.id === 'submitBtn') {
        
        element.value = 'Submit';
        
    } else {
        
        element.value = '';
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    getFormData();
});

// ..:: MODAL SETTINGS

const modal = document.querySelector('#myModal');
const submitBtn = document.querySelector('#submitBtn');
const btnAdd = document.querySelector('#addBtn');

// Get the <span> element that closes the modal
const span = document.querySelector('.close');

btnAdd.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}