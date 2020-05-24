/**
 * 此js存储项目全局变量
 */

// api接口地址
const baseURL = '/hola/';
var oldTokenMsg = localStorage.getItem("tokenMsg") || "{}";
oldTokenMsg = JSON.parse(oldTokenMsg);
var token = oldTokenMsg.token;
var teamId = localStorage.getItem("teamId") || "";
var loginUserMsg = JSON.parse(localStorage.getItem("loginUserMsg") || "{}");
var tokenGetTime = oldTokenMsg.tokenGetTime;
var isvip1 = localStorage.getItem("isvip1") == "true" || false;
var isvip2 = localStorage.getItem("isvip2") == "true" || false;
export default {
	baseURL,
	token,
	teamId,
	loginUserMsg,
	tokenGetTime,
	isvip1,
	isvip2,
}