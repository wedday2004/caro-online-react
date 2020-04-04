import URL from './URL';

const APIService = {
  LOGIN: `${URL}/user/login`,
  REGISTER: `${URL}/user/register`,
  GET_INFO: `${URL}/me`,
  CHANGE_INFO: `${URL}/user/updateinfo`,
  CHANGE_AVATAR: `${URL}/user/uploadavatar`,
  CHANGE_PASSWORD: `${URL}/user/changepassword`
};

export default APIService;
