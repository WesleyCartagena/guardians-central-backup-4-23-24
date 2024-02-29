
import Carousel from 'react-bootstrap/Carousel';
import './WeeklyRotators.scss'

const WeeklyRotators = () => {
    return(
          <Carousel>
            <Carousel.Item interval={1000000}>
                <img src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Raid</h2>
                    <h3>Raid Name</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Dungeon</h2>
                    <h3>Dungeon Name</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Exotic Quest</h2>
                    <h3>Quest Name</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Nightfall</h2>
                    <h3>Nightfall Name</h3>
                </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    );
}

export default WeeklyRotators