import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Container, Tabs, Tab, ListGroup} from 'react-bootstrap'
import ProfileOrders from '../ProfileOrders/ProfileOrders'
import Wishlist from '../Wishlist/Wishlist'
import {useAuth} from '../../context/AuthContext'
import {getFirestore} from '../../config/firebase'


const Profile = ({location}) => {
    //Auth
    const {currentUser} = useAuth()

    //State
    const [userData, setUserData] = useState({})
    const [items, setItems] = useState([])
    const [selectedTab, setSelectedTab] = useState(location.state.target || 'compras')
    const [loading, setLoading] = useState(false)    

    //Effect
    useEffect(() => {
        const db = getFirestore()
        const userCollection = db.collection('users')
        const wishlist = db.collection("wishlists")
        const itemCollection = db.collection('items')

        setLoading(true)
        userCollection.where("uid", "==", currentUser.uid).get()
        .then((querySnapshot) => {
            if(querySnapshot.size === 0){
                console.log('[Profile] No data found for this user')
            } 
            setUserData(querySnapshot.docs.map(doc => doc.data())[0])
        })
        .catch((err) => {
            console.log("[Profile] Error searching user data.", err)
        })

        wishlist.doc(currentUser.uid).get()
        .then((docRef) => {            
            if(docRef.exists){
                return docRef.data().items
            }
        })
        .then((wishlistData) => {
            let itemIds = wishlistData.map(item => item.id)

            itemCollection.where("id", "in", itemIds).get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 0){
                    console.log('[WishlistContainer] No results')
                } 
                setItems([...querySnapshot.docs.map(doc => doc.data())])
            })
        })
        .catch((err) => {
            console.log("[Profile] Error retrieving wishlist.", err)
        })
        setLoading(false)
    },[]);

    //Helpers
    const handleSelect = (key) => {
        setSelectedTab(key)
    }

    return (
        <Container className="flex-column align-self-start align-items-center justify-content-stretch h-100" style={{margin:"auto", marginTop: "1rem",verticalAlign: "top"}}>
            <h1>Tu perfil</h1>
            <Tabs fill variant="tabs" activeKey={selectedTab} className="w-100 mh-100 p-3" onSelect={(key)=>handleSelect(key)} >
                <Tab eventKey="compras" title="Mis Compras">
                    <ProfileOrders/>
                </Tab>
                <Tab eventKey="favoritos" title="Mis Favoritos">
                    {selectedTab === 'favoritos' && <Wishlist loading={loading} items={items}/>}
                </Tab>
                <Tab eventKey="datos" title="Mis Datos">
                    <ListGroup variant="flush">
                        <ListGroup.Item>Nombre: {userData?.name}</ListGroup.Item>
                        <ListGroup.Item>Apellido: {userData?.surname}</ListGroup.Item>
                        <ListGroup.Item>Email: {currentUser.email}</ListGroup.Item>
                        <ListGroup.Item>Teléfono: {userData?.phone}</ListGroup.Item>
                        <ListGroup.Item>Código Postal: {userData?.zip}</ListGroup.Item>
                        <ListGroup.Item>Dirección: {userData?.address}</ListGroup.Item>
                        <ListGroup.Item>Dirección 2: {userData?.address_2}</ListGroup.Item>
                        <ListGroup.Item>Ciudad/Localidad: {userData?.city}</ListGroup.Item>
                        <ListGroup.Item>Provincia: {userData?.state}</ListGroup.Item>                      
                    </ListGroup>                    
                </Tab>
                <Tab eventKey="configuracion" title="Configuración">
                    <ListGroup variant="flush">
                        <ListGroup.Item as={Link} to="/recover-password" style={{color: "black"}}>Restaurar contraseña</ListGroup.Item>                  
                    </ListGroup>   
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Profile
