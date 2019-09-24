import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { closeModal } from './modalActions'

const actions = {
  closeModal
}
const decideValue = () => {
  if(Math.random() > 0.5)
    return "Appetizer"
  else
    return "Dessert"
}
const TestModal = ({closeModal}) => {
    return(
            <Modal closeIcon="close" open={true} onClose={closeModal}>
              <Modal.Header>A Coupon!</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <p>Congratulations! You've Won A Free {decideValue()}</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
    )
}

export default connect(null, actions)(TestModal)