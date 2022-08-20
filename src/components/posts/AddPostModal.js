import {useContext, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {

    // Contexts
    const { showAddPostModal , setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const {title, description, url} 
    = newPost

    const onChangeNewPost = (event) => setNewPost({
        ...newPost,
        [event.target.name]: event.target.value
    })

    const onSubmit = async (event) => {
        event.preventDefault()  
        const {success, message} = await addPost(newPost)
        resetAddPostData()
        setShowToast({show: true,message, type: success ? 'success' : 'danger'})
    }

    const resetAddPostData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowAddPostModal(false)
    }

  return (
    <Modal show={showAddPostModal} onHide={resetAddPostData}>
          <Modal.Header>
              <Modal.Title>What do you want to learn?</Modal.Title>
              <Button type="button" className='btn-close text-dark' onClick={resetAddPostData}></Button>

          </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='my-3'>
                        <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title}
                        onChange={onChangeNewPost} />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>

                      <Form.Group className='my-3'>
                          <Form.Control as='textarea' placeholder='Description'
                          row={3} name='description' value={description} onChange={onChangeNewPost} />
                      </Form.Group>

                  <Form.Group className='my-3'>
                        <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url' value={url} onChange={onChangeNewPost} />
                      </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetAddPostData}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        Add
                    </Button>
                </Modal.Footer>
            </Form>   
    </Modal>
  )
}

export default AddPostModal