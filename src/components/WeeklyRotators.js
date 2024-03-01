
import Carousel from 'react-bootstrap/Carousel';
import './WeeklyRotators.scss'

const renderItems = (list) => {
    const result = []
    for(let i = 0; i < list.length; i++){
        result.push(<img className="img-fluid img-icon" key={i} src={list[i]} alt={`Item ${i + 1}`} />);
    }
    return result
}

const WeeklyRotators = () => {
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
    let weeklyNightfallLoot = []
    let nightfallHeroMods = []
    let nightfallLegendMods = []
    let nightfallMasterMods = []

    return(
          <Carousel>
            <Carousel.Item interval={1000000}>
                <img className="img-fluid" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Raid</h2>
                    <h3>Raid Name</h3>
                    <div className='info-container d-inline-flex'>
                        <div className='img-column-container'>
                            <h5>Weapons</h5>
                            {renderItems(raidWeaponList)}
                        </div>
                        <div className='img-column-container'>
                            <h5>Armor</h5>
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
                        <div className='img-column-container'>
                            <h5>Cosmetics</h5>
                             {renderItems(raidCosmeticList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
                <img className="img-fluid" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Dungeon</h2>
                    <h3>Dungeon Name</h3>
                    <div className='info-container d-inline-flex'>
                        <div className='img-column-container'>
                            <h5>Weapons</h5>
                            {renderItems(dungeonWeaponList)}
                        </div>
                        <div className='img-column-container'>
                            <h5>Armor</h5>
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
                        <div className='img-column-container'>
                            <h5>Cosmetics</h5>
                             {renderItems(dungeonCosmeticList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
                <img className="img-fluid" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Exotic Quest</h2>
                    <h3>Quest Name</h3>
                    <div className='info-container d-inline-flex'>
                        <div className='img-column-container'>
                            <h5>Weapons</h5>
                            {renderItems(exoticQuestWeaponList)}
                        </div>
                        <div className='img-column-container'>
                            <h5>Armor</h5>
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
                        <div className='img-column-container'>
                            <h5>Catalyst</h5>
                             {renderItems(exoticQuestCatalystList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
                <img className="img-fluid" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"/>
                <Carousel.Caption className='top-0'>
                    <h2>Weekly Nightfall</h2>
                    <h3>Nightfall Name</h3>
                    <div className='info-container d-inline-flex'>
                        <div className='mods-column-container'>
                            <h5>Weekly Loot</h5>
                            {renderItems(exoticQuestCatalystList)}
                        </div>
                    </div>
                    <div className='info-container d-inline-flex'>
                        <div className='mods-column-container d-flex flex-column'>
                            <h5>Hero Mods</h5>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                        </div>
                        <div className='mods-column-container d-flex flex-column'>
                            <h5>Legend Mods</h5>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                        </div>
                        <div className='mods-column-container d-flex flex-column'>
                            <h5>Master Mods</h5>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                            <div>
                                <img className='mod-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"></img>
                                <span>Empath</span>
                            </div>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    );
}

export default WeeklyRotators