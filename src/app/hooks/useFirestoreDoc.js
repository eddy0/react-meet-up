import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncReducer'
import { dataFromSnapshot } from '../firestore/fireStoreService'


function useFirestoreDoc({query, callback, deps, shouldExcute=true}) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (shouldExcute === false) {
      return
    }
    dispatch(asyncActionStart())
    const unsubscribe = query().onSnapshot(
      snapshot => {
        if (snapshot.exists === false) {
          dispatch(asyncActionError({'code': 'not-found', 'message': 'docs not found'}))
          return
        }
        callback(dataFromSnapshot(snapshot))
        dispatch(asyncActionFinish())
      },
      error => dispatch(asyncActionError())
    )
    return () => unsubscribe()
  }, deps)

}

export default useFirestoreDoc