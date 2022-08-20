import {useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {

    // Contexts
    const { 
        postState: {post}, 
        showUpdatePostModal , 
        setShowUpdatePostModal, 
        updatePost,
        setShowToast
    } = useContext(PostContext)

    // State
    const [updatedPost, setUpdatedPost] = useState(post)

    useEffect(() => setUpdatedPost(post), [post])

    const {title, description, url, status} 
        = updatedPost

    const onChangeUpdatedPost = (event) => setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

    const onSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await updatePost(updatedPost)
        setShowUpdatePostModal(false)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }

    const closeDialog = () => {
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }

  return (
      <Modal show={showUpdatePostModal}  onHide={closeDialog}>
          <Modal.Header>
              <Modal.Title>Making progress??</Modal.Title>
              <Button type="button" className='btn-close text-dark' onClick={closeDialog}></Button>

          </Modal.Header>
          <Form onSubmit={onSubmit}>
              <Modal.Body>
                  <Form.Group className='my-3'>
                      <Form.Control
                          type='text'
                          placeholder='Title'
                          name='title'
                          required
                          aria-describedby='title-help'
                          value={title}
                          onChange={onChangeUpdatedPost}
                      />
                      <Form.Text id='title-help' muted>
                          Required
                      </Form.Text>
                  </Form.Group>
                  <Form.Group className='my-3'>
                      <Form.Control
                          as='textarea'
                          rows={3}
                          placeholder='Description'
                          name='description'
                          value={description}
                          onChange={onChangeUpdatedPost}
                      />
                  </Form.Group>
                  <Form.Group className='my-3'>
                      <Form.Control
                          type='text'
                          placeholder='Youtube Tutorial URL'
                          name='url'
                          value={url}
                            onChange={onChangeUpdatedPost}
                        />
                    </Form.Group>
                  <Form.Group className='my-3'>
                        <Form.Control
                            as='select'
                            value={status}
                            name='status'
                            onChange={onChangeUpdatedPost}
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        Update!
                    </Button>
                </Modal.Footer>
          </Form>
      </Modal>
  )
}

export default UpdatePostModal