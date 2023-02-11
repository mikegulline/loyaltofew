import EasyPost from '@easypost/api';

const API_KEY = process.env.EASYPOST_API_TEST;

const EasyPostApi = new EasyPost(API_KEY);

export default EasyPostApi;
