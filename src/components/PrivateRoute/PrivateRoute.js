import {Route, Redirect} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    //Auth
    const {currentUser} = useAuth()

    return (
        <Route 
        {...rest}
        render={ props => currentUser ? <Component {...props} /> : <Redirect to="/login"/> }        
        />
    )
}

export default PrivateRoute