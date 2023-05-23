

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Users } from './components/Users/Users';
import { SignUp } from './components/SignUp/SignUp';
import { SuccessMessage } from './components/SignUp/SignUpSuccess/SignUpSuccess';
import { USERS_ON_PAGE } from './consts';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useScrollToAnchor } from './utils/useScrollToAnchor.hook';
import Navbar from './components/Top/Navbar';
import Banner from './components/Top/Banner';

function App() {
   const [isSignUpSuccess, setIsSignUpSuccess] = useState(false)
   const [registrationError, setRegistrationError] = useState('')
   const [users, setUsers] = useState([])
   const [usersLastPage, setUsersLastPage] = useState(0)
   const [isUsersLoading, setIsUsersLoading] = useState(false)
   const [positions, setPositions] = useState([])


const fetchUsersNextPage = async (arg) => {
   setIsUsersLoading(true)
   
   let prevUsersLastPage = 0
   let prevUsers = []
   if (!arg?.shouldCollapse) {
      prevUsersLastPage = usersLastPage
      prevUsers = users
   }

   const nextUsers = (await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${prevUsersLastPage + 1}&count=${USERS_ON_PAGE}`)).data.users
   console.log(nextUsers);
   console.log([...prevUsers, ...nextUsers]);
   setUsers([...prevUsers, ...nextUsers])
   setUsersLastPage(prevUsersLastPage + 1)

   setIsUsersLoading(false)
}


const registerUser = async (user) => {
   try {
      const newToken = (await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')).data.token
      await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users',
         user,
         {headers: {Token: newToken}}
      )
      setIsSignUpSuccess(true)
      fetchUsersNextPage({shouldCollapse: true})
   } catch (error) {
      console.log(error.response.data.message);
      setRegistrationError(error.response.data.message)
   }
}

const fetchPositions = async () => {
   const positions = (await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')).data.positions
   setPositions(positions)
}

useEffect(() => {
   fetchUsersNextPage()
   fetchPositions()
}, [])


//scroll to anchor on reload
const { hash } = useLocation();
const scrollToAnchor = useScrollToAnchor()
useEffect(() => {
      scrollToAnchor(hash.substring(1))
}, []);

   return (
      <>
         <Navbar isSignUpSuccess={isSignUpSuccess}/>
         <Banner isSignUpSuccess={isSignUpSuccess} />
         <Users 
            users={users} 
            fetchUsersNextPage={fetchUsersNextPage}
            isUsersLoading={isUsersLoading}
         />
         {
            isSignUpSuccess
               ?
                  <SuccessMessage />
               : 
                  <SignUp registerUser={registerUser} registrationError={registrationError} positions={positions}/>
         }
      </>
   );
}

export default App;
