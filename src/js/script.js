'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
  },
};

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
    thisBooksList.getElements();
    thisBooksList.render();
  }

  getElements() {
    const thisBooksList = this;
    thisBooksList.booksList = document.querySelector(select.containerOf.booksList);
  }

  render() {
    const thisBooksList = this;
    for (const book of thisBooksList.data) {
      const generatedHTML = templates.bookTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.booksList.appendChild(element);
    }
  }
}

const app = new BooksList();
app;
