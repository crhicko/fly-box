import './Footer.css'
import { LinkedinLogo, GithubLogo } from 'phosphor-react';

const Footer = () => {

    return(
        <div className="footer-box">
            <div className='text-section'>
                <div className='column'>
                    <h3>Fly Box</h3>
                    <ul className='footer-list'>
                        <li>Contact</li>
                        <li>About</li>
                    </ul>
                </div>
                <div className='column'>
                    <h3>Developer</h3>
                    <a href="https://github.com/crhicko"><GithubLogo size={48} weight="fill" /></a>
                    <a href="https://www.linkedin.com/in/crhicko/"><LinkedinLogo size={48} weight="fill" /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;