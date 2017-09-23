export class ObjectFormSerializable {

    public static Parse(data: any): string {
        let obj = "";
        let key: string[] = [];
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
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
        /** 获取所有key值 */
        key.every(x => {
            if (eval('data.' + x) === null || eval('data.' + x) === undefined) {
                obj += "&" + x + "=";
            }
            else if (eval('data.' + x) != null && typeof eval('data.' + x) == "number") {
                obj += "&" + x + "=" + eval('data.' + x);
            }
            else if (eval('data.' + x) != null && typeof eval('data.' + x) == "string") {
                obj += "&" + x + "=" + encodeURI(eval('data.' + x));
            }
            return true;
        });
        return obj;
    }


    private static Convert(data: any, key: string[], top?: string): void {
        Object.keys(data).every(x => {
            let perfix = top != "" ? top + "." : "";
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
                            for (let i = 0; i < data[x].length; i++) {
                                switch (typeof data[x][i]) {
                                    case "string":
                                        key.push(perfix + x + "[" + i + "]");
                                        break;
                                    case "number":
                                        key.push(perfix + x + "[" + i + "]");
                                        break;
                                    case "object":
                                        this.Convert(data[x][i], key, perfix + x + "[" + i + "]");
                                        break;
                                }
                            }
                        }
                        else {
                            this.Convert(data[x], key, perfix + x);
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
    }
}