import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class Search extends React.Component {
  state = {
    query: '',
    bookResults: []
  }


  searchBooks = (query) => {
    BooksAPI.search(query).then(res => {
      if(!res || !Array.isArray(res)) res = []
      console.log('this.state.bookResults: ', this.state.bookResults)
      console.log('res[0]: ', res[0])
      this.setState({bookResults: res})
    })
    this.setState({query})
  }

  handleSubmit = (book, value) => {
    console.log('search handle submit hopefully about to call props.onSaveBook')
    if(this.props.onSaveBook) {
      this.props.onSaveBook(book, value)
    }
  }

  render() {
    const {query} = this.state
    const {bookResults} = this.state
    const defaultThumbnail = "https://books.google.ca/googlebooks/images/no_cover_thumb.gif"
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text"
                placeholder="Search by or author"
                value={query}
                onChange={(event) =>this.searchBooks(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {bookResults.map((book, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+(book.imageLinks.thumbnail || defaultThumbnail)+'")' }}></div>
                      <div className="book-shelf-changer">
                        <select defaultValue="none" onChange={(event) => this.handleSubmit(book, event.target.value)}>
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
    )
  }
}

export default Search
