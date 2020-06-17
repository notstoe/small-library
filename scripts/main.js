let myLibrary = [];

function createBook() {

    let titleInput = window.prompt('Title of the book:'),
        authorInput = window.prompt('Author of the book:'),
        pageNumInput = window.prompt('Number of pages in the book:'),
        readInput = window.prompt('Have you read it? yes or no');

    if (readInput.toLowerCase() === 'yes'){
        readInput = true 
    } else {
        readInput = false;
    }

    return new book(titleInput, authorInput, pageNumInput, readInput);
}


function addToLibrary(bookObj) {
    myLibrary.push(bookObj);
}



function book(title, author, pageNum, read) {                                               //constructor

    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.read = read
    
}

book.prototype.info = function() {

    if (this.read) {

        return `${this.title}, by ${this.author}, it has ${this.pageNum} pages and it was already read.`;

    } else {
  
        return `${this.title}, by ${this.author}, it has ${this.pageNum} pages and it was not read yet.`;
    }
}



const nameoftheWind = new book('The Name of the Wind', 'Patrick Rothfuss', 1260, true);
const hitchhikersGuide = new book('The Ultimate Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 950, false);
const howtobeImperfectionist = new book('How to be an Imperfectionist', 'Stephen Guise', 2590, true);

const firstBookInfo = document.querySelector('.bookInfo');
firstBookInfo.textContent = nameoftheWind.info();




// ..:: MODAL SETTINGS

const modal = document.querySelector('#myModal');

const btnAdd = document.querySelector("#addBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

btnAdd.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 