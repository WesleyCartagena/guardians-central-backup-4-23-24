import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faSquareXTwitter,faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Footer =() => {
    return(

            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 bg-dark relative-bottom">
            <div className="col-md-4 d-flex align-items-center">
                <Link className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1 text-light" to="/">
                    <FontAwesomeIcon className = "text-light px-2" icon={faMoon} size="xl" />
                </Link>
                <span className="mb-3 mb-md-0 text-body-secondary"><Link className="text-decoration-none link-light" to="/">© 2023 Guardians Central, Inc</Link></span>
            </div>
        
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-3">
                <li className="ms-3 text-light"><FontAwesomeIcon icon={faSquareXTwitter} size="xl" /></li>
                <li className="ms-3 text-light"><FontAwesomeIcon icon={faGithub} size="xl" /></li>
                <li className="ms-3 text-light"><FontAwesomeIcon icon={faDiscord} size="xl" /></li>
            </ul>
            </footer>

        
    )
};

export default Footer