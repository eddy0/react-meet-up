import React, {useState, useEffect} from 'react'
import {Grid, Segment, Item, Header, Statistic, Divider, Reveal, Button} from 'semantic-ui-react'
import {followUser, getFollowingDoc, unfollowUser} from '../../../app/firestore/fireStoreService'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from "react-redux";
import {setFollowUser, setUnFollowUser} from "../profileActions";
import {CLEAR_FOLLOWINGS} from "../profileConstants";

function ProfileHeader({profile, isCurrentUser}) {
    const dispatch = useDispatch()
    const {displayName, photoURL} = profile
    const [loading, setLoading] = useState(false)
    const {followingUser} = useSelector(state => state.profile)

    async function fetchFollowingDoc() {
        try {
            const followingDocs = await getFollowingDoc(profile.id)
            if (followingDocs && followingDocs.exists) {
                dispatch(setFollowUser())
            }
        } catch (error) {
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isCurrentUser) return
        setLoading(true)
        fetchFollowingDoc().then(() => {
            setLoading(false)
        })
        return () => {
            dispatch({type: CLEAR_FOLLOWINGS})
        }
    }, [dispatch, profile.id, isCurrentUser])

    const handleFollowUser = async () => {
        setLoading(true)
        try {
            await followUser(profile)
            dispatch(setFollowUser())
        } catch (error) {
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }

    const handleUnFollowUser = async () => {
        setLoading(true)
        try {
            await unfollowUser(profile)
            dispatch(setUnFollowUser())
        } catch (error) {
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size={'small'} src={photoURL || '/assets/user.png'}/>
                            <Item.Content verticalAlign={'middle'}>
                                <Header as={'h1'} style={{display: 'block', marginBottom: '10'}}
                                        content={displayName}
                                />

                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group>
                        <Statistic label={'Followers'} value={profile.followerCount || 0}/>
                        <Statistic label={'Followering'} value={profile.followingCount || 0}/>
                    </Statistic.Group>
                    {
                        !isCurrentUser && (
                            <>
                                <Divider/>
                                <Reveal animated={'move'}>
                                    <Reveal.Content visible style={{width: '100%'}}>
                                        <Button fluid color='teal'
                                                content={followingUser ? 'Following' : 'Not Following'}/>
                                    </Reveal.Content>

                                    <Reveal.Content hidden style={{width: '100%'}}>
                                        <Button basic fluid color={followingUser ? 'red' : 'green'}
                                                content={followingUser ? 'UnFllow' : 'Follower'} loading={loading}
                                                onClick={followingUser ? handleUnFollowUser : handleFollowUser}/>
                                    </Reveal.Content>
                                </Reveal>

                            </>
                        )
                    }

                </Grid.Column>
            </Grid>

        </Segment>
    )
}

export default ProfileHeader