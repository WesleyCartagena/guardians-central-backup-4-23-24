import '../../App.css'
import TimerCard from '../../components/TimerCard/TimerCard';
import Accordian from '../../components/Accordian/Accordian'
import TwitterTabs from '../../components/TwitterTabs/TwitterTabs';
// Make background image only be background for content or set that a default background for everythng a load anothe for content
// Will be loading another for each page anyway
const Home = () => {

    return(
        // Remove Message once homepage is done
        <div className="Home">
            <div className='d-inline-flex flex-column justify-content-center w-100'>
                <TimerCard/>
                <Accordian/>
                <TwitterTabs/>
            </div>
        </div>
    );

}

export default Home;