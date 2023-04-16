import axios from 'axios';
import PropTypes from 'prop-types';


axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '84412fa643a0198aa37738ee706214da';


export const getMovies = async (appendPath, query = '') => {
  try {
    const response = await axios.get(appendPath, {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


getMovies.propTypes = {
  appendPath: PropTypes.string.isRequired,
  query: PropTypes.string,
};

