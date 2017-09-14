import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Search from './Search'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
class BooksApp extends React.Component {
  state = {

    books: [],
    showSearchPage: false
  }

  updateBook = (book, shelf) => {
    console.log('book.shelf: ', book.shelf)
    if(book.shelf !== shelf) {
      console.log('about to call update')
      BooksAPI.update(book, shelf).then((res) => {
        console.log('done updating book')
        book.shelf = shelf
        this.setState((prevState) => {
          var booksFiltered = prevState.books.filter(bookA => bookA.id !== book.id)
          booksFiltered.push(book)
          return prevState.books = booksFiltered
        })
        console.log('this.state: ', this.state)
        var bookIds = this.state.books.map(book => {
          return book.id
        })
        localStorage.setItem('bookIds', bookIds)
      })
    }
    // var booksLocal = this.state.books
    //filter out existing instance of this book in case it alreayd is in the master list
  }

  componentDidMount(){
    var booksToFetch = localStorage.getItem('bookIds')
    if(!booksToFetch || !booksToFetch.length) return
    booksToFetch = booksToFetch.split(',')
    console.log('books to fetch: ', booksToFetch)
    if(booksToFetch.length){
      console.log('1')
      booksToFetch.map(bookId => {
        console.log('2 id: ', bookId)
        BooksAPI.get(bookId).then(res => {
          console.log('3 res: ', res)
          if(res){
            console.log('this.state: ', this.state)
            this.setState((prevState) => {
              return prevState.books.push(res)
            })
          }
        })
      })
    }
  }


  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <BookList onSaveBook={this.updateBook} books={this.state.books}/>
      )}/>
        <Route exact path="/search" render={() => (
          <Search onSaveBook={this.updateBook} />
        )}/>


      </div>
    )
  }
}

export default BooksApp
