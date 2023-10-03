import '../../App.css'
import TimerCard from '../../components/TimerCard/TimerCard';
import Message from '../../components/Message/Message';
import Accordian from '../../components/Accordian/Accordian'

const Home = () => {
    let messageHeader = "Guardians Central"
    let message = "Welcome to our first Destiny 2 website. Please leave us any feedback in our feedback option below. Happy Slaying Guardians, from the GC Dev Team"
    return(
        // Remove Message once homepage is done
        <div className="Home">
            <div className='d-flex justify-content-center'>
                <Message header={messageHeader} message={message}/>
            </div>
            <div className='d-inline-flex flex-column justify-content-center w-50'>
                <TimerCard/>
                <Accordian/>
            </div>
        </div>
    );

}

export default Home;