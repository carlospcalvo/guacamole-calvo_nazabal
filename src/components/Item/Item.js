import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import './Item.css'

const Item = (props) => {
    //Props
    const {uid, title, price, pictureUrl} = props.item
    const requestImageFile = require.context('../../images/items', true, /.jpeg$/);
    const imgUrl = requestImageFile(`./${pictureUrl}.jpeg`).default
    
    return (
        <>
            <Link to={`/item/${uid}`} className='ItemContainer' >
                <Card className='ItemContainer'>
                    <Card.Img className="ItemImage" variant="top" src={imgUrl} alt={title}/>
                    <Card.Body className="ItemBody">
                        <Card.Title className="ItemTitle">{title}</Card.Title>
                        <Card.Title className="ItemPrice">$ {price}</Card.Title>
                    </Card.Body>                
                </Card>
            </Link>
        </>
    )

}

export default Item