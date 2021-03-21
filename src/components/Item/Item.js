import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import './Item.css'

const Item = (props) => {
    //props
    const {id, title, description, price, pictureUrl} = props.item
    const requestImageFile = require.context('../../images/items', true, /.jpg$/);
    const imgUrl = requestImageFile(`./${pictureUrl}.jpg`).default

    return (
        <>
            <Link to={`/item/${id}`} className='ItemContainer' >
                <Card className='ItemContainer'>
                    <Card.Img className="ItemImage" variant="top" src={imgUrl} alt={title}/>
                    <Card.Body className="ItemBody">
                        <Card.Title className="ItemTitle">{title}</Card.Title>
                        <Card.Subtitle className="ItemDescription">{description}</Card.Subtitle>
                        <Card.Title className="ItemPrice">$ {price}</Card.Title>
                    </Card.Body>                
                </Card>
            </Link>
        </>
    )

}

export default Item