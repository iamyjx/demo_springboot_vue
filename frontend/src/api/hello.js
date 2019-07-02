import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const hello = {
    // 新闻列表
    get () {
        return axios.get(`${base.sq}/hello`);
    }
}
export default hello;
