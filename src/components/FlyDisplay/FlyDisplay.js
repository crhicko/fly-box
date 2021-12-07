import './FlyDisplay.css'

const FlyDisplay = ({ fly }) => {

    return(
        <div className="FlyContainer">
            <h1>{fly.name}</h1>
        </div>
    )
}

FlyDisplay.propTypes = {

}

export default FlyDisplay