import React from 'react'
import {Card, Grid, Header, Tab} from 'semantic-ui-react'
import ProfileCard from "./ProfileCard";
import {log} from "../../../common/util/util";
import {useDispatch, useSelector} from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {getFollowersCollection, getFollowingCollection} from "../../../app/firestore/fireStoreService";
import {listenToFollowerings, listenToFollowers} from "../../events/eventActions";

function FollowingTab({profile, activeTab}) {
    const dispatch = useDispatch()
    const {followings, followers} = useSelector(state => state.profile)

    useFirestoreCollection({
        query: () => activeTab === 3 ? getFollowersCollection(profile.id) : getFollowingCollection(profile.id),
        callback: (data) => {
            if (activeTab === 3) {
                dispatch(listenToFollowers(data))
            } else {
                dispatch(listenToFollowerings(data))
            }
        },
        deps: [dispatch, activeTab]
    })


    return (
        <Tab.Pane>

            <Grid>
                <Grid.Column width={16}>
                    <Header floated={'left'} icon={'user'} content={activeTab === 3 ? 'Followers' : 'Followering'}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={5}>
                        {
                            activeTab === 3 && followers.map(profile => (
                                <ProfileCard key={profile.id} profile={profile} />
                            ))
                        }
                        {
                            activeTab === 4 && followings.map(profile => (
                                <ProfileCard key={profile.id} profile={profile} />
                            ))
                        }
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}


export default FollowingTab;