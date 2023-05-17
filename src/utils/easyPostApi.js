import EasyPost from '@easypost/api';

// live endpoint
const EP_API_KEY = process.env.EASYPOST_API;

// test endpoint
// const EP_API_KEY = process.env.EASYPOST_API_TEST;

const api = new EasyPost(EP_API_KEY);

export default api;
