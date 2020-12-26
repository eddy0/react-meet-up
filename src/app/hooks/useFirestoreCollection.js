import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncReducer'
import { dataFromSnapshot } from '../firestore/fireStoreService'


function useFirestoreCollection({query, callback, deps}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncActionStart())
    const unsubscribe = query().onSnapshot(
      snapshot => {
        if (snapshot.exists === false) {
          dispatch(asyncActionError({'code': 'not-found', 'message': 'docs not found'}))
          return
        }
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc))
        callback(docs)
        dispatch(asyncActionFinish())
      },
      error => dispatch(asyncActionError(error))
    )
    return  () => unsubscribe()
  }, deps)

}

export default useFirestoreCollection