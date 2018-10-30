import React, { Component } from 'react';

import { updateNote } from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import NoteForm from './NoteForm'

let ans = null
// console.log('heyo');

class NewNote extends Component {
  state = {
    title: 'Easter Egg',
    content: 'Did you see it?',
    updated: false
  }

  componentDidUpdate() {
    (!this.state.updated && ans)
    ? this.setState({ title: ans.title, content: ans.content, updated: true})
    : ''

  }

  componentDidMount() {
    this.setState({updated: false})
  }

  handleChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newNote = {
      title: this.state.title,
      content: this.state.content,
      id: this.props.noteList.find(item => item._id = this.props.match.params.id)._id
    }
    console.log(newNote._id);
    this.props.updateNote(newNote)
    this.setState({ title:'', content:'' })

  }

  render() {
    ans = this.props.noteList.find(item => item._id == this.props.match.params.id)
    return (
      <React.Fragment>
      <h2 className='notes-title'> Edit Note:</h2>
      <NoteForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        state={this.state}
      />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
  }
}

export default withRouter(connect(mapStateToProps, { updateNote }) (NewNote))
