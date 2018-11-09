var ObjectFormSerializable = /** @class */ (function () {
    function ObjectFormSerializable() {
    }
    ObjectFormSerializable.Parse = function (data, isencode) {
        if (isencode === void 0) { isencode = true; }
        var obj = "";
        var key = [];
        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                switch (typeof data[i]) {
                    case "string":
                        key.push("[" + i + "]");
                        break;
                    case "number":
                        key.push("[" + i + "]");
                        break;
                    case "object":
                        if (data[i] != null) {
                            this.Convert(data[i], key, "[" + i + "]");
                        }
                        else {
                            key.push("[" + i + "]");
                        }
                        break;
                }
            }
        }
        else {
            this.Convert(data, key, "");
        }
        /** 默认按照key名称进行升序排序 */
        key.sort();
        /** 获取所有key值 */
        if (Array.isArray(data)) {
            key.every(function (x) {
                if (eval('data' + x) === null || eval('data' + x) === undefined) {
                    obj += "&" + x + "=";
                }
                else if (eval('data' + x) != null && typeof eval('data' + x) == "number") {
                    obj += "&" + x + "=" + eval('data' + x);
                }
                else if (eval('data' + x) != null && typeof eval('data' + x) == "string") {
                    obj += "&" + x + "=" + (isencode ? encodeURI(eval('data' + x)) : eval('data' + x));
                }
                return true;
            });
        }
        else {
            key.every(function (x) {
                if (eval('data.' + x) === null || eval('data.' + x) === undefined) {
                    obj += "&" + x + "=";
                }
                else if (eval('data.' + x) != null && typeof eval('data.' + x) == "number") {
                    obj += "&" + x + "=" + eval('data.' + x);
                }
                else if (eval('data.' + x) != null && typeof eval('data.' + x) == "string") {
                    obj += "&" + x + "=" + (isencode ? encodeURI(eval('data.' + x)) : eval('data.' + x));
                }
                return true;
            });
        }
        return obj;
    };
    ObjectFormSerializable.Convert = function (data, key, top) {
        var _this = this;
        Object.keys(data).every(function (x) {
            var perfix = top != "" ? top + "." : "";
            switch (typeof data[x]) {
                case "string":
                    key.push(perfix + x);
                    break;
                case "number":
                    key.push(perfix + x);
                    break;
                case "function":
                    break;
                case "undefined":
                    key.push(perfix + x);
                    break;
                case "object":
                    if (data[x] != null) {
                        if (Array.isArray(data[x])) {
                            for (var i = 0; i < data[x].length; i++) {
                                switch (typeof data[x][i]) {
                                    case "string":
                                        key.push(perfix + x + "[" + i + "]");
                                        break;
                                    case "number":
                                        key.push(perfix + x + "[" + i + "]");
                                        break;
                                    case "object":
                                        _this.Convert(data[x][i], key, perfix + x + "[" + i + "]");
                                        break;
                                }
                            }
                        }
                        else {
                            _this.Convert(data[x], key, perfix + x);
                        }
                    }
                    else {
                        key.push(perfix + x);
                    }
                    break;
            }
            return true;
        });
        return;
    };
    return ObjectFormSerializable;
}());
export { ObjectFormSerializable };
//# sourceMappingURL=index.js.map