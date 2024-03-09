
import Carousel from 'react-bootstrap/Carousel';
import './WeeklyRotators.scss'
import { useEffect, useState } from 'react';

const renderItems = (list) => {
    const result = []
    for(let i = 0; i < list.length; i++){
        result.push(<img className="img-fluid wr-img-icon" key={i} src={list[i]} alt={`Item ${i + 1}`} />);
    }
    return result
}

const renderText = (list) => {
    const result = []
    for(let i = 0; i < list.length; i++){
        let key = Object.keys(list[i])[0];
        let value = list[i][key];
        result.push(
            <div className='wr-mods-column' key={i}>
                <img className='wr-mod-icon' key={i} src={value} alt={`Item ${i + 1}`}></img>
                <span className='wr-mod-text'>{key}</span>
            </div>
        );
    }
    return result
}


const WeeklyRotators = () => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 992);
      };
  
      // Initial check on mount
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // Raid lists
    let raidWeaponList = [
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"
    ]
    let raidTitanArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let raidHunterArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let raidWarlockArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let raidCosmeticList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]

    // Dungeon lists
    let dungeonWeaponList = [
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"
    ]
    let dungeonTitanArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let dungeonHunterArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let dungeonWarlockArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let dungeonCosmeticList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    // Exotic mission lists
    let exoticQuestWeaponList = [
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"
    ]
    let exoticQuestTitanArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let exoticQuestHunterArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let exoticQuestWarlockArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let exoticQuestCatalystList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]

    // Nightfall lists
    let weeklyNightfallLoot = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let nightfallHeroMods = [
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}

    ]
    let nightfallLegendMods = [
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}
    ]
    let nightfallMasterMods = [
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}
    ]

    return(
          <Carousel>
            <Carousel.Item interval={1000000}>
            <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Raid</h2>
                    <h3 className='fw-bold'>Raid Name</h3>
                    <div className={`info-container ${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Weapons</h5>
                            {renderItems(raidWeaponList)}
                        </div>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Armor</h5>
                            <div className='Titan'>
                                {renderItems(raidTitanArmorList)}
                            </div>
                            <div className='Hunter'>
                                {renderItems(raidHunterArmorList)}
                            </div>
                            <div className='Warlock'>
                                {renderItems(raidWarlockArmorList)}
                            </div>
                        </div>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Cosmetics</h5>
                             {renderItems(raidCosmeticList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
            <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Dungeon</h2>
                    <h3 className='fw-bold'>Dungeon Name</h3>
                    <div className={`info-container ${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Weapons</h5>
                            {renderItems(dungeonWeaponList)}
                        </div>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Armor</h5>
                            <div className='Titan'>
                                {renderItems(dungeonTitanArmorList)}
                            </div>
                            <div className='Hunter'>
                                {renderItems(dungeonHunterArmorList)}
                            </div>
                            <div className='Warlock'>
                                {renderItems(dungeonWarlockArmorList)}
                            </div>
                        </div>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Cosmetics</h5>
                             {renderItems(dungeonCosmeticList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
            <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Exotic Quest</h2>
                    <h3 className='fw-bold'>Quest Name</h3>
                    <div className={`info-container ${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Weapons</h5>
                            {renderItems(exoticQuestWeaponList)}
                        </div>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Armor</h5>
                            <div className='Titan'>
                                {renderItems(exoticQuestTitanArmorList)}
                            </div>
                            <div className='Hunter'>
                                {renderItems(exoticQuestHunterArmorList)}
                            </div>
                            <div className='Warlock'>
                                {renderItems(exoticQuestWarlockArmorList)}
                            </div>
                        </div>
                        <div className='wr-img-column-container'>
                            <h5 className='fw-bold'>Catalyst</h5>
                             {renderItems(exoticQuestCatalystList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
                <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Nightfall</h2>
                    <h3 className='fw-bold'>Nightfall Name</h3>
                    <div className='info-container d-inline-flex px-2'>
                        <div className='wr-mods-column-container'>
                            <h5 className='fw-bold'>Weekly Loot</h5>
                            {renderItems(weeklyNightfallLoot)}
                        </div>
                    </div>
                    <div className='info-container d-inline-flex' >
                        <div className='wr-mods-column-container d-flex flex-column px-2'>
                            <h5 className='fw-bold'>Hero Mods</h5>
                            {renderText(nightfallHeroMods)}
                        </div>
                        <div className='wr-mods-column-container d-flex flex-column px-2'>
                            <h5 className='fw-bold'>Legend Mods</h5>
                            {renderText(nightfallLegendMods)}
                        </div>
                        <div className='wr-mods-column-container d-flex flex-column px-2'>
                            <h5 className='fw-bold'>Master Mods</h5>
                            {renderText(nightfallMasterMods)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    );
}

export default WeeklyRotators