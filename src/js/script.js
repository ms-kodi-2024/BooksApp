'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
    filters: '.filters',
  },
  imageOf: {
    bookImage: 'book__image',
    dataId: 'data-id',
    value: 'value',
  },
};

const classNames = {
  book: {
    favorite: 'favorite',
    hidden: 'hidden',
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
    const filters = [];
    thisBooksList.render();
    thisBooksList.initActions(favoritesBooks, filters);
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
  
  filterBook(filters) {
    const thisBooksList = this;
    for (const book of thisBooksList.data) {
      const hiddenBook = document.querySelector(`.book__image[data-id="${book.id}"]`);
      let shouldBeHidden = false;      
      for (const filter of filters) {
        if (!book.details[filter]) {          
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden) {
        hiddenBook.classList.add(classNames.book.hidden);
      } else {
        hiddenBook.classList.remove(classNames.book.hidden);
      }
    }
  }

  initActions(favoritesBooks, filters) {
    const thisBooksList = this;
    thisBooksList.booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      if (clickedElement && clickedElement.classList.contains(select.imageOf.bookImage)) {
        const dataId = clickedElement.getAttribute(select.imageOf.dataId);
        if (!favoritesBooks.includes(dataId)) {
          favoritesBooks.push(dataId);
          clickedElement.classList.add(classNames.book.favorite);
        } else {
          const indexBook = favoritesBooks.indexOf(dataId);
          favoritesBooks.splice(indexBook, 1);
          clickedElement.classList.remove(classNames.book.favorite);
        }
      }
    });
    thisBooksList.booksFilters = document.querySelector(select.containerOf.filters);
    thisBooksList.booksFilters.addEventListener('click', function (event) {
      const clickedElement = event.target;
      if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
        if (clickedElement.checked) {
          filters.push(clickedElement.getAttribute(select.imageOf.value));
        } else {
          const indexFilter = filters.indexOf(clickedElement.getAttribute(select.imageOf.value));
          filters.splice(indexFilter, 1);
        }        
        thisBooksList.filterBook(filters);
      }
    });
  }
}

const app = {
  init: function () {
    new BooksList();
  }
};

app.init();