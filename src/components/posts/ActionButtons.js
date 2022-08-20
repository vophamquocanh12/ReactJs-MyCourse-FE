import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import {PostContext} from '../../contexts/PostContext'
import { useContext } from 'react'

const ActionButtons = ({ url, _id }) => {

    const { deletePost, findPost, setShowToast, setShowUpdatePostModal } = useContext(PostContext)



    const onDelete = async (event) => {
        event.preventDefault()
        const { success } = deletePost(_id)
        setShowToast({ show: true, message: 'Delete successfully!', type: success ? 'success' : 'danger' })
    }
    
    const choosePost = postId => {
        findPost(postId)
        setShowUpdatePostModal(true)
    }

    return (
        <>
            <Button className='post-button' href={url} target='_blank' >
                <img src={playIcon} alt='play' with='24' height='24' />
            </Button>

            <Button className='post-button' onClick={choosePost.bind(this, _id)}>
                <img src={editIcon} alt='edit' with='24' height='24' />
            </Button>

            <Button className='post-button' onClick={onDelete}>
                <img src={deleteIcon} alt='delete' with='24' height='24' />
            </Button>
        </>
    )
}
export default ActionButtons;