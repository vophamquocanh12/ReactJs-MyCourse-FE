import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import {AuthContext} from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button  from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'

const Dashboard = () => {
  // Contexts 
  const {authState : {user: { username}}} = useContext(AuthContext)

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast
  } = useContext(PostContext)

  //Start: Get all posts
  useEffect(() => getPosts(), [])

  let body = null

  if(postsLoading){
    body =(
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    )
  }else if(posts.length === 0){
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi {username}</Card.Header>
          <Card.Body>
              <Card.Title>
                Welcome to MyCourse
              </Card.Title>
              <Card.Text>
                Click the button below to track your first skill to learn
              </Card.Text>
              <Button variant='primary' onClick={setShowAddPostModal.bind(this, true)}>Add My Course!</Button>
          </Card.Body>
        </Card>
      </>
    )
  }else{
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map(post => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open Add Post Modal */}
        {/*<OverlayTrigger placement='left' overlay={<ToolTip>
            Add a new thing to learn
        </ToolTip>}>*/}
          <Button className='btn-floating' onClick={setShowAddPostModal.bind(this, true)}>
            <img src={addIcon} alt='add-post' with='60' height='60' />
          </Button>
        {/*</OverlayTrigger>*/}
      </>
    )
  }


  return (
    <>
     {body}     
      <AddPostModal /> 

      {post !== null && <UpdatePostModal />}

      {/* After post is added, show toast */}
      <Toast show={show} style={{ position: 'fixed', top: '9%', right: '10px' }} className={`bg-${type} text-white`}  delay={3000}  autohide onClose={setShowToast.bind(this, {
        show: false, 
        message:'', 
        type: null
      })
    }>
        <Toast.Body>
          <strong>
            {message}
          </strong>
        </Toast.Body>
      </Toast>
    </>
  )
}

export default Dashboard