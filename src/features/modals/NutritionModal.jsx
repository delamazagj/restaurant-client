import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { closeModal } from './modalActions'

const actions = {
  closeModal
}

const NutritionModal = ({closeModal}) => {
    return(
            <Modal closeIcon="close" open={true} onClose={closeModal}>
              <Modal.Header>Nutritional Information</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <p>Nutrtion Modal... nothing to see here yet!</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
    )
}

export default connect(null, actions)(NutritionModal)