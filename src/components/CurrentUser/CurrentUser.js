import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const CurrentUser = () => {
  //Auth
  const {currentUser, logout} = useAuth()

  //Location
  const history = useHistory()

  //Helpers
  const handleLogout = async () => {
      try{
        await logout()
        history.push("/login")
      }  catch {
        console.log("User could not log out.")
      }

  }

  return (
      <div className="text-center">
          <h5>Actualmente estás logueada/o como <b>{currentUser.email}</b> <Button variant="link" className="ml-3" onClick={handleLogout}>Salir</Button> </h5>
      </div>  
  )
}

export default CurrentUser