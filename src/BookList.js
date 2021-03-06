import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'

class BookList extends React.Component {
  state = {

  }


  handleSubmit = (book, value) => {
    console.log('search handle submit hopefully about to call props.onSaveBook')
    if(this.props.onSaveBook) {
      this.props.onSaveBook(book, value)
    }
  }

  render() {
    const defaultThumbnail = "https://books.google.ca/googlebooks/images/no_cover_thumb.gif"
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.filter(book => book.shelf === 'currentlyReading').map((book, index) => (
                  <li key={index}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+(book.imageLinks.thumbnail || defaultThumbnail)+'")' }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={book.shelf} onChange={(event) => this.handleSubmit(book, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.artist}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.filter(book => book.shelf === 'wantToRead').map((book, index) => (
                  <li key={index}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+(book.imageLinks.thumbnail || defaultThumbnail)+'")' }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={book.shelf} onChange={(event) => this.handleSubmit(book, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.artist}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.filter(book => book.shelf === 'read').map((book, index) => (
                  <li key={index}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+(book.imageLinks.thumbnail || defaultThumbnail)+'")' }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={book.shelf} onChange={(event) => this.handleSubmit(book, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.artist}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
