import axios from 'axios';

function TagsService() {
  const getTags = async (pageSize, sortBy, sortOrder) => {
    const response = await axios.get(`https://api.stackexchange.com/2.2/tags?page=1&pagesize=${pageSize}&order=${sortOrder}&sort=${sortBy}&site=stackoverflow`);
    return response.data.items;
  };

  return { getTags };
}

export default TagsService;
