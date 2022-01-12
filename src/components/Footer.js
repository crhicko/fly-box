import './Footer.css'

const Footer = () => {

    return(
        <div className="footer-box">
            <div className='text-section'>
                <div className='column'>
                    <h3>Header</h3>
                    <ul className='footer-list'>
                        <li>Contact Us</li>
                        <li>footer</li>
                    </ul>
                </div>
                <div className='column'>
                    <h3>Developer Contacts</h3>
                    <a href="https://github.com/crhicko"><i class="fab fa-github fa-2x"/></a>
                    <a href="https://www.linkedin.com/in/clayton-hickok-10b2a814a/"><i class="fab fa-linkedin-in fa-2x"/></a>
                    {/* <i class="fab fa-github"></i>
                    <i class="fab fa-linkedin-in"></i> */}
                    {/* <ul className='footer-list'>
                        <li><a href="https://github.com/crhicko"><i class="fab fa-github"/></a></li>
                        <li><a href="https://www.linkedin.com/in/clayton-hickok-10b2a814a/"><i class="fab fa-linkedin-in"/></a></li>
                    </ul> */}
                </div>
            </div>
        </div>
    )
}

export default Footer;