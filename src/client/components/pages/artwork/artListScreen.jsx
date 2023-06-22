import React from 'react'
import {  Row, Col,Card } from 'react-bootstrap'

const ArtList = ({ }) => {
  return (
    <>
      {/* the list of art items  */}
      <Row>
        <Col className='text-center'>
          <h1>Art List</h1>
        </Col>
        <Col className=' text-right'>
          <Card className='my-3-p-3 rounded'>
            <Card.Body>
              <Card.Title>Art List</Card.Title>
            </Card.Body>
         </Card>
        </Col>
      </Row>


    </>
  )
}
export default ArtList
