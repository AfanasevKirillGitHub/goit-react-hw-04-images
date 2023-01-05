import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => (
    <button className='Button' type="button" onClick={loadMore}>
        Load more
    </button>
);

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
};