import * as React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ArrowRight from '@material-ui/icons/ArrowRight'
import { Link } from 'react-router-dom'
// export interface HomePageProps {
// }

const Home = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(105deg, lightblue, lightcoral);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default class HomePage extends React.Component<any, any> {
  public render() {
    return (
      <Home>
        <Typography variant='h3' color='inherit' className='mg_b--sm'>
          Come and Join US
        </Typography>
        <Link to='/events'>
          <Button variant='contained' color='primary'>
            Get Started!
            <ArrowRight />
          </Button>
        </Link>
      </Home>
    )
  }
}
