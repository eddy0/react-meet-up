import React, {useEffect, useState} from 'react'
import {Segment, Header, Comment} from 'semantic-ui-react'
import EventDetailChatForm from './EventDetailChatForm'
import {useDispatch, useSelector} from 'react-redux'
import {getEventChatRef} from '../../../app/firestore/firebaseService'
import {creatDateTree, objectToArray} from '../../../common/util/util'
import {listenToEventChat} from '../eventActions'
import {Link} from 'react-router-dom'
import {formatDistance} from 'date-fns'
import {CLEAR_COMMENTS} from '../eventConstants'

const EventDetailChat = ({eventId, parentId}) => {
    const dispatch = useDispatch()
    const {comments} = useSelector(state => state.event)
    const {authenticated} = useSelector(state => state.auth)
    const [showReplyForm, setShowReplyForm] = useState({
        open: false,
        commentId: null,
    })

    useEffect(() => {
        getEventChatRef(eventId).on('value', snapshot => {
            if (!snapshot.exists()) {
                return
            }
            const res = objectToArray(snapshot.val()).reverse()
            dispatch(listenToEventChat(res))
        })
        return () => {
            dispatch({type: CLEAR_COMMENTS})
            getEventChatRef().off()
        }
    }, [eventId, dispatch])

    const handleCloseReplyForm = () => {
        setShowReplyForm({
            open: false,
            commentId: null,
        })
    }

    let formattedComments = creatDateTree(comments)

    return (
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{border: 'none'}}
            >
                <Header>
                    {
                        authenticated ? 'Chat about this event' : 'Sign in'
                    }
                </Header>
            </Segment>

            {authenticated &&
            <Segment attached>
                <EventDetailChatForm eventId={eventId} parentId={0} closeForm={handleCloseReplyForm}/>

                <Comment.Group>
                    {
                        formattedComments.map(comment => {
                            return (
                                <Comment key={comment.id}>
                                    <Comment.Avatar src={comment.photoURL || '/assets/user.png'}/>
                                    <Comment.Content>
                                        <Comment.Author as={Link}
                                                        to={`profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{formatDistance(comment.date, new Date())}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>
                                            {
                                                comment.text.split('\n').map((text, i) => {
                                                    return (
                                                        <span key={i}>
                              {text}
                                                            <br/>
                            </span>
                                                    )
                                                })
                                            }
                                        </Comment.Text>
                                        <Comment.Actions>
                                            <Comment.Action
                                                onClick={() => setShowReplyForm({
                                                    open: true,
                                                    commentId: comment.id
                                                })}>Reply</Comment.Action>
                                            {
                                                showReplyForm.open && showReplyForm.commentId === comment.id &&
                                                <EventDetailChatForm eventId={eventId} parentId={comment.id}
                                                                     closeForm={handleCloseReplyForm}/>
                                            }
                                        </Comment.Actions>
                                    </Comment.Content>
                                    {
                                        comment.childNodes.length > 0 &&
                                        <Comment.Group>
                                            {
                                                comment.childNodes.map(child => {
                                                    return (
                                                        <Comment key={child.id}>
                                                            <Comment.Avatar src={child.photoURL || '/assets/user.png'}/>
                                                            <Comment.Content>
                                                                <Comment.Author as={Link}
                                                                                to={`profile/${child.uid}`}>{child.displayName}</Comment.Author>
                                                                <Comment.Metadata>
                                                                    <div>{formatDistance(child.date, new Date())}</div>
                                                                </Comment.Metadata>
                                                                <Comment.Text>
                                                                    {
                                                                        child.text.split('\n').map((text, i) => {
                                                                            return (
                                                                                <span key={i}>
                              {text}
                                                                                    <br/>
                            </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </Comment.Text>

                                                                <Comment.Actions>

                                                                    <Comment.Action
                                                                        onClick={() => setShowReplyForm({
                                                                            open: true,
                                                                            commentId: child.id,
                                                                        })}>Reply
                                                                    </Comment.Action>
                                                                    {

                                                                        showReplyForm.open && showReplyForm.commentId === child.id &&
                                                                        <EventDetailChatForm eventId={eventId}
                                                                                             parentId={child.parentId}
                                                                                             closeForm={handleCloseReplyForm}/>
                                                                    }

                                                                </Comment.Actions>
                                                            </Comment.Content>
                                                        </Comment>
                                                    )
                                                })
                                            }
                                        </Comment.Group>
                                    }
                                </Comment>
                            )
                        })
                    }
                </Comment.Group>
            </Segment>
            }
        </>
    )
}

export default EventDetailChat