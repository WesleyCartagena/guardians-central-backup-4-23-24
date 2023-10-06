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
            height: '500'
        }}
        />
    </div>
 )
}

export default TwitterWidget