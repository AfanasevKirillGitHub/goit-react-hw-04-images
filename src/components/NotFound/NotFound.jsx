import errorFind from '../NotFound/errorFind.jpeg'
import PropTypes from 'prop-types';

export const NotFound = ({ error }) => {
    return (
        <div className="Wrapper">
            <h2>{error}</h2>
            <img src={errorFind} alt="error" />
        </div>
    );
};

NotFound.propTypes = {
    error: PropTypes.string.isRequired
}

