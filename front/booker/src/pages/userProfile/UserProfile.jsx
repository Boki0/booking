import React from 'react'
import DeleteUserDialog from './DeleteUserDialog';
import { AuthContext } from '../../components/context/AuthContext';
import { useContext } from 'react';
import { useNotification } from '../../components/notification/NotificationProvider';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useState } from 'react';

const UserProfile = ({authOrApi}) => {

  //authOrApi je parametar koji diktira koji controller na back-u se poziva

  const dispatch = useNotification();

  const { user } = useContext(AuthContext);

  const isProviderReserved = useFetch(`http://localhost:8080/api/provider-reserved/${user.id}`)

  const handleDelete = (id, explanation) =>
    {
      fetch(`http://localhost:8080/${authOrApi}/create-deletion-request/${id}?request_text=${explanation}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          if (!res.ok){
            if (res.status == 409){
              console.log('email exists error');
              throw Error('E-mail already exists!');
            }
            console.log('unknown error')
            throw Error('Unknown fetch error occurred!')
          } 
          return res.json()
        })
        .then(data => {
          sendNotification("success", "You successfully sent a request for deletion. Please wait for administrator to approve your request!");
        })
        .catch(err => {
          sendNotification("error", err.message)
        })
    }

  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: '/'
    });
  }

  return (
      <DeleteUserDialog userId={user.id} handleDelete={handleDelete} isProviderReserved={isProviderReserved.data} authOrApi={authOrApi}/>
  )
}

export default UserProfile