import axios from 'helper/axios';
import { msgErr } from "helper/ui/dialog";
import { notify } from "helper/ui/notify";
import { errFormat } from "helper/output";

const fetchGetUserInfo = () => axios.get('/user');

export async function GetUserInfo() {
  let resp;
  try {
    resp = await fetchGetUserInfo();
  } catch (err) {
    return;
  }
  const { data } = resp.data;
  if (!data) return;
  return data;
}