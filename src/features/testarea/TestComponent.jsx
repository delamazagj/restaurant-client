import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { incrementAsync, decrementAsync } from './testActions'
import { openModal } from '../modals/modalActions'
import { firestoreConnect} from 'react-redux-firebase';

const mapState = (state) => ({ //getting data from the store
    data: state.test.data,
    loading: state.test.loading,
    seeTables: state.firestore.ordered.TableStatus
})

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
}

class TestComponent extends Component {

  tryModal = () => {
    if(Math.random() > 0.8)
    {
        this.props.openModal('TestModal', {data: 42})
    }
    else
    {
        return alert("Sorry You did not win")
    }
      
  }

  render() {
    const {incrementAsync, decrementAsync, data, openModal, loading, seeTables} = this.props;
    return (
      <div>
        {seeTables && console.log(seeTables)}
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} onClick={incrementAsync} color='green' content='Increment'/>
        <Button loading={loading} onClick={decrementAsync} color='red' content='Decrement'/>
        <Button onClick={this.tryModal} color='teal' content='Open Modal'/>
      </div>
    )
  }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'TableStatus'}])(TestComponent));
//export default connect(mapState, actions)(TestComponent) //mapsstate with a Higher order component