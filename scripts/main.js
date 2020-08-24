// ..:: GLOBAL VARIABLES

let myLibrary = [];
let storage = window.localStorage;

// ..:: HEADER HELP

const help = document.querySelector('#help');
help.addEventListener('click', () => alert('Add a book to get started and you\'re all set! \n\nUse it as your personal library!'));

// ..:: MAIN FUNCTIONS

function createBook(bookInfoArr) {                                          //array with book info: title[0], author[1], pagenum[2], readInput[3]
                                                                            //creates new book object and clears the Arr
                                                                            
    if (bookInfoArr[3] === 'true') bookInfoArr[3] = true;
    if (bookInfoArr[3] === 'false') bookInfoArr[3] = false;
    
    let brandNewBook = new book(bookInfoArr[0], bookInfoArr[1], bookInfoArr[2], bookInfoArr[3]);
    bookInfo = [];
    return brandNewBook;
}

function addToLibrary(bookObj) {
    
    const libraryBooks = document.querySelector('.books');
    
    const bookToAdd = document.createElement('div');
    bookToAdd.classList.add('singleBook');
        bookToAdd.setAttribute('id', `book${myLibrary.length - 1}`);
        bookToAdd.setAttribute('data-attribute', `${bookObj.author}`);                              //attribute to link with remove on myLibrary array
        bookToAdd.textContent = bookObj.info();
        
        const removeBtn = document.createElement('img');                                            //creates delete button
        removeBtn.setAttribute('src', 'images/trashcan.png');
            removeBtn.setAttribute('alt', 'black trashcan');
            removeBtn.setAttribute('id', `removeBtn${myLibrary.length - 1}`);
            removeBtn.classList.add('removeBtn');
            
            removeBtn.addEventListener('click', deleteBook);

    bookToAdd.appendChild(removeBtn);

        const checkRead = document.createElement('input');                                           //creates read status checkbox
        const checkReadLabel = document.createElement('label');
            checkReadLabel.textContent = 'Read';
            checkReadLabel.classList.add('checkReadLabel');

            checkRead.setAttribute('type', 'checkbox');
            checkRead.setAttribute('name', 'readInput');
            checkRead.setAttribute('id', 'readInput');
            checkRead.classList.add('checkRead');
            checkRead.value = 'Read';
            checkRead.checked = bookObj.read;

            checkRead.addEventListener('change', updateStatusRead);
            
    bookToAdd.appendChild(checkReadLabel);
    bookToAdd.appendChild(checkRead);

    
    libraryBooks.appendChild(bookToAdd);
}

function updateStatusRead(e) {
    
    let refNumberArr = myLibrary.findIndex(element => element.author === e.target.parentNode.getAttribute('data-attribute'));                     //finds the index for this book on MyLibrary array
    myLibrary[refNumberArr].changeReadStatus();
}

function deleteBook(e){
    
    const libraryBooks = document.querySelector('.books');
    
    refNumberArr = myLibrary.findIndex(element => element.author === e.target.parentNode.getAttribute('data-attribute'));                     //finds the index for this book on MyLibrary array
    myLibrary.splice(refNumberArr,1);
    
    libraryBooks.removeChild(e.target.parentNode);
}

// .. :: BOOK OBJECT CONSTRUCTOR AND FUNCTIONS

function book(title, author, pageNum, read) {                                               //constructor
    
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.read = read
    
}

book.prototype.info = function () {

    return `${this.title} by ${this.author}. ${this.pageNum} pages`;
}

book.prototype.changeReadStatus = function () {
    
    this.read? this.read = false : this.read = true;
}

// .. :: LOCAL STORAGE HANDLING

window.addEventListener('unload',saveLibrary);

function saveLibrary() {                                           //saving books on local storage as string

    let allBooksValue;
    let allBooksKey;
    
    myLibrary.forEach((bookElement, index) => {
        
        allBooksValue = bookElement.title + ',' + bookElement.author + ',' + bookElement.pageNum + ',' + bookElement.read;
        allBooksKey = `book${index}`;
        
        storage.setItem(allBooksKey, allBooksValue);
    }); 
}

window.addEventListener('load', renderLibrary);

function renderLibrary() {
    
    let storagedBooks = [];
    let tempBookInfo = [];
    
    for (let i = 0; i < storage.length; i++) {
            storagedBooks.push(storage.getItem(`book${i}`));
        }
        
        storagedBooks.forEach((storagedBook) => {
            
            tempBookInfo = storagedBook.split(',');
            myLibrary.push(createBook(tempBookInfo));                                          
            addToLibrary(myLibrary[myLibrary.length-1]); 

        });
        
        storage.clear();
    }
    
    
// .. :: FORM HANDLING
    
const form = document.querySelector('form');

function handleFormData() {                                                                //gets form Data, adds new book and resets form
    
    let bookInfo = [];                                                                     //array with book's title, author, numpages and read status
    
    
    const elements = document.querySelectorAll('input');
    elements.forEach(element => {
        
        if (element.id === 'readInput'){
            bookInfo.push(element.checked);
        } else {
            bookInfo.push(element.value);
        }
    
    });

    myLibrary.push(createBook(bookInfo));                                           
    addToLibrary(myLibrary[myLibrary.length-1]);   

    elements.forEach(resetForm); 
}

function resetForm(element) {
    
    if (element.id === 'readInput') {
        return;
        
    } else if (element.id === 'submitBtn') {
        
        element.value = 'Submit';
        
    } else if (element.id === 'pageNumInput') {
        
        element.value = 0;
        
    } else {
        
        element.value = '';
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    handleFormData();
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

submitBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.inputStyle');
    
    inputs.forEach((input) => {
        if(input.validity.valueMissing){
            input.setCustomValidity('This field is required');
        } else {
            input.setCustomValidity('');
        }
    });
});