import './LandingPage.css'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <>
            <section className='splash wave-bg'>
                <h1 style={{fontSize: '2rem', marginBottom:'1rem'}}>Find Flies, Learn to Tie, Catch Fish</h1>
                <div className='button-box'>
                    <button className='btn text-large' onClick={() => navigate('/login')}>Sign Up</button>
                    <button className='btn text-large' onClick={() => navigate('/flies')}>View Flies</button>
                </div>
            </section>
        </>
    )
}

export default LandingPage;