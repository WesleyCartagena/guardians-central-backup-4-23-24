import Card from 'react-bootstrap/Card';

function Message(props){
    return(
        <Card className='w-50 justify-content-center'>
            <Card.Header className='fs-1 bg-dark'>
                {props.header}
            </Card.Header>
            <Card.Body className="mb-0 fs-4 bg-light">
                {props.message}
            </Card.Body>
        </Card>
    )
}
export default Message;