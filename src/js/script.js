'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
  },
  imageOf: {
    bookImage: '.book__image',
  },
};

const classNames = {
  book: {
    favorite: 'favorite',
  },
};

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
    const favoritesBooks = [];
    thisBooksList.render();
    thisBooksList.initActions(favoritesBooks);
  }

  render() {
    const thisBooksList = this;
    thisBooksList.booksList = document.querySelector(select.containerOf.booksList);
    for (const book of thisBooksList.data) {
      const generatedHTML = templates.bookTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.booksList.appendChild(element);
    }
  }
  
  initActions(favoritesBooks) {
    const thisBooksList = this;
    thisBooksList.booksImages = thisBooksList.booksList.querySelectorAll(select.imageOf.bookImage);
    for (const bookImage of thisBooksList.booksImages) {
      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const dataId = bookImage.getAttribute('data-id');
        if (!favoritesBooks.includes(dataId)) {
          favoritesBooks.push(dataId);
          bookImage.classList.add(classNames.book.favorite);
        } else {
          const indexBook = favoritesBooks.indexOf(dataId);
          favoritesBooks.splice(indexBook, 1);
          bookImage.classList.remove(classNames.book.favorite);
        }
      });
    }
  }
}

const app = {
  init: function () {
    new BooksList();
  }
};

app.init();