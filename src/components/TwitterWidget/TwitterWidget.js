import { Timeline } from 'react-twitter-widgets'


const TwitterWidget = (props) => {
 return (
    <div>
        <Timeline
        dataSource={{
            sourceType: 'profile',
            screenName: props.screenName
        }}
        options={{
            height: '400'
        }}
        />
    </div>
 )
}

export default TwitterWidget