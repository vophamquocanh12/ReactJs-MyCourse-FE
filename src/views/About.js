import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
  return (
    <Row className='mt-5' style={{marginRight: 0}}>
        <Col className='text-center'>
              <Button variant='primary' size='lg' href='https://www.facebook.com/anhvpq.1501/'>
                  Visit my facebook profile to know more about me         
            </Button>
        </Col>
    </Row>
  )
}

export default About