/**
 * 此js存储项目全局函数
 */
export default {
    install: function(Vue, options) {
        Vue.prototype.goUrl = function(url) {
            this.$router.push({
                path: url
            })
        };
        Vue.prototype.goUrls = function(url, id) {
            console.log("url", url);
            console.log("id", id);
            this.$router.push({
                path: url,
                query: {
                    id: id
                }
            })
        };
        Vue.prototype.goUrld = function(url, fname, fid, name, id) {
            this.$router.push({
                path: url,
                query: {
                    fname: fname,
                    name: name,
                    fid: fid,
                    id: id
                }
            })
        };
        Vue.prototype.changePage = function(url, params) {
            this.$router.push({
                path: url,
                query: params
            });
        };
        Vue.prototype.loginOut = function() {
            localStorage.removeItem("tokenMsg");
            localStorage.removeItem("loginUserMsg");
            localStorage.removeItem("teamId");
            location.href = location.href.split("#")[0];
            /*this.$router.push({
                path: '/'
            })*/
        };
        Vue.prototype.doAjax = function(params) {
            var _this = this;
            params.method = params.method || "POST"; //默认做post请求
            params.method = params.method.toUpperCase();
            params.data = params.data || {};
            var token = _this.GLOBAL.token;
            var teamId = _this.GLOBAL.teamId;
            params.url = _this.GLOBAL.baseURL + params.url;
            if (token) {
                params.data.token = token;
                params.data.teamId = teamId;
                var now = new Date().getTime();
                var tokenGetTime = _this.GLOBAL.tokenGetTime;
                if ((now - tokenGetTime) >= (55 * 60 * 1000)) {
                    axios({
                        url: _this.GLOBAL.baseURL + "refreshPCLoginStatus",
                        method: "post",
                        data: {
                            token: token
                        }
                    }).then(function(ret) {
                        var d = ret.data;
                        if (d.code == 305) {
                            //登录失效
                            localStorage.removeItem("tokenMsg");
                            localStorage.removeItem("loginUserMsg");
                            localStorage.removeItem("teamId");
                            location.href = location.href.split("#")[0];
                        } else if (d.code) {

                        } else {
                            var token = ret.data;
                            _this.GLOBAL.token = token;
                            _this.GLOBAL.tokenGetTime = new Date().getTime();
                            localStorage.setItem("tokenMsg", JSON.stringify({
                                token: token,
                                tokenGetTime: _this.GLOBAL.tokenGetTime
                            }));
                        }
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            }
            if (params.method == "GET") {
                //使用get请求
                return axios.get(params.url, {
                    params: params.data
                }).then(function(ret) {
                    var d = ret.data;
                    if (d.code == 305) {
                        //登录失效
                        localStorage.removeItem("tokenMsg");
                        localStorage.removeItem("loginUserMsg");
                        localStorage.removeItem("teamId");
                        location.href = location.href.split("#")[0];
                    } else if (d.code) {
                        _this.$message({
                            message: d.msg,
                            type: "error"
                        });
                    } else {
                        params.success(ret);
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            }
            if (params.method == "POST") {
                //使用post请求
                return axios(params).then(function(ret) {
                    var d = ret.data;
                    if (d.code == 305) {
                        //登录失效
                        localStorage.removeItem("tokenMsg");
                        localStorage.removeItem("loginUserMsg");
                        localStorage.removeItem("teamId");
                        location.href = location.href.split("#")[0];
                    } else if (d.code) {
                        _this.$message({
                            message: d.msg,
                            type: "error"
                        });
                    } else {
                        params.success(ret);
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            }
        };
        Vue.prototype.dateFormat = function(date, format) {
            if (!date) {
                return "-";
            }
            date = new Date(date);
            var y = date.getFullYear();
            var M = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            M = M < 10 ? ("0" + M) : M;
            d = d < 10 ? ("0" + d) : d;
            h = h < 10 ? ("0" + h) : h;
            m = m < 10 ? ("0" + m) : m;
            s = s < 10 ? ("0" + s) : s;
            format = format.replace("yyyy", y);
            format = format.replace("MM", M);
            format = format.replace("dd", d);
            format = format.replace("hh", h);
            format = format.replace("mm", m);
            format = format.replace("ss", s);
            return format;
        };
        Vue.prototype.goUrlsd = function(url) {
            let going = this.$router.resolve({
                path: url
            })
            window.open(going.href, '_blank');
        };
        Vue.prototype.checkUserVip = function(ret, _this) {
            //设置用户VIP信息
            var nowtime = new Date().getTime()
            if (ret.payVip1) {
                var vipendtime = new Date(Date.parse(ret.vipEndTime)).getTime();
                if (vipendtime >= nowtime) {
                    _this.endDays = ((vipendtime - nowtime) / 1000 / 60 / 60 / 24).toFixed(0);
                    localStorage.setItem("isvip1", true)
                } else {
                    _this.endDays = 0;
                    _this.isEndTime = true;
                    localStorage.setItem("isvip1", false)
                }
            } else {
                localStorage.setItem("isvip1", false)
            }
            if (ret.payVip2) {
                var vip2endtime = new Date(Date.parse(ret.vip2EndTime)).getTime();
                if (vip2endtime >= nowtime) {
                    _this.endDays = ((vip2endtime - nowtime) / 1000 / 60 / 60 / 24).toFixed(0);
                    localStorage.setItem("isvip2", true)
                } else {
                    _this.endDays = 0;
                    _this.isEndTime = true;
                    localStorage.setItem("isvip2", false)
                }
            } else {
                localStorage.setItem("isvip2", false)
            }
            _this.GLOBAL.isvip1 = localStorage.getItem("isvip1") == "true";
            _this.GLOBAL.isvip2 = localStorage.getItem("isvip2") == "true";
            _this.isvip1 = _this.GLOBAL.isvip1;
            _this.isvip2 = _this.GLOBAL.isvip2;
        };
        Vue.prototype.checkUserTeam = function(cb) {
            var _this = this;
            getMyTeamList();

            function checkUserVip(ret) {
                //设置用户VIP信息
                var nowtime = new Date().getTime()
                if (ret.payVip1) {
                    var vipendtime = new Date(Date.parse(ret.vipEndTime)).getTime();
                    if (vipendtime >= nowtime) {
                        localStorage.setItem("isvip1", true)
                    } else {
                        localStorage.setItem("isvip1", false)
                    }
                } else {
                    localStorage.setItem("isvip1", false)
                }
                if (ret.payVip2) {
                    var vip2endtime = new Date(Date.parse(ret.vip2EndTime)).getTime();
                    if (vip2endtime >= nowtime) {
                        localStorage.setItem("isvip2", true)
                    } else {
                        localStorage.setItem("isvip2", false)
                    }
                } else {
                    localStorage.setItem("isvip2", false)
                }
                _this.GLOBAL.isvip1 = localStorage.getItem("isvip1") == "true";
                _this.GLOBAL.isvip2 = localStorage.getItem("isvip2") == "true";
                console.log(_this.GLOBAL);
                cb && cb();
            }

            function getMyTeamList() {
                _this.doAjax({
                    url: 'myTeamList',
                    method: "get",
                    data: {
                        page: 1,
                        pageSize: 1000,
                    },
                    success: function(ret) {
                        if (!ret.data.length) {
                            //无团队
                            addNewTeam();
                            return;
                        }
                        var team = ret.data[0];
                        checkUserVip(team);
                        var teamId = team.objectId;
                        _this.GLOBAL.teamId = teamId;
                        _this.GLOBAL.teamName = team.name;
                        localStorage.setItem("teamId", teamId);
                    }
                });
            }

            /**
             * 添加一个默认团队
             */
            function addNewTeam() {
                var _this = this;
                var userInfo = _this.GLOBAL.loginUserMsg;
                _this.doAjax({
                    url: "updateTeamMember",
                    method: "post",
                    data: {
                        type: 6,
                        name: userInfo.nickname + "的团队",
                        remark: "自动生成的团队"
                    },
                    success: function(ret) {
                        getMyTeamList();
                    }
                })
            }
        };
    }
}
