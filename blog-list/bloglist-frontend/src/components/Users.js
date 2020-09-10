import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Link,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import { initializeUsers } from '../reducer/userReducer'
import User from './User';


const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch();
  const userMatch = useRouteMatch('/user/:id');
  const user = userMatch
    ? users.find(user => user.id === (userMatch.params.id))
    : null;

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch])
  
  return (
    <div>
      <Switch>
        <Route path="/user/:id">
          <User user={user} />
        </Route>

        <Route path="/">
            <h2>Users</h2>
          <table>
            <thead>
              <tr><th></th><th>blogs created</th></tr>
            </thead>
            <tbody>
              {users.map(user => <tr key={user.id}>
                <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>)}
            </tbody>
          </table>
        </Route>
      </Switch>
    </div>
  )
}

export default Users;