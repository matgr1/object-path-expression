"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPath(pathExpression) {
    var leaf = getObjectPath(pathExpression);
    return leaf.path;
}
exports.getPath = getPath;
function getObjectPath(pathExpression) {
    var path = createObjectPath([]);
    if (typeof (pathExpression) === "function") {
        path = path.child(pathExpression);
    }
    return path;
}
exports.getObjectPath = getObjectPath;
function createObjectPath(path) {
    var _path = path;
    function _child(pathExpression) {
        var proxy = createObjectPathProxy([]);
        pathExpression(proxy.proxy);
        var childPath = _path.concat(proxy.path);
        return createObjectPath(childPath);
    }
    return {
        path: _path,
        child: _child
    };
}
var _proxyTarget = Object.freeze({});
function createObjectPathProxy(path) {
    var result = {
        proxy: null,
        path: path
    };
    var _proxyAccessed = false;
    result.proxy = new Proxy(_proxyTarget, {
        get: function (target, propertyKey, reciever) {
            if (process.env.NODE_ENV !== "production") {
                if (_proxyAccessed) {
                    throw new Error("Parent already accessed");
                }
                _proxyAccessed = true;
                result.path.push(propertyKey);
                var childProxy = createObjectPathProxy(result.path);
                return childProxy.proxy;
            }
            _proxyAccessed = true;
            result.path.push(propertyKey);
            return result.proxy;
        }
    });
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0UGF0aEV4cHJlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvT2JqZWN0UGF0aEV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVQSxpQkFBc0MsY0FBNEM7SUFFakYsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFlLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ2xCLENBQUM7QUFKRCwwQkFJQztBQUlELHVCQUFxQyxjQUEyQztJQUUvRSxJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBUSxFQUFFLENBQUMsQ0FBQztJQUV2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQzNDLENBQUM7UUFDQSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNiLENBQUM7QUFWRCxzQ0FVQztBQUVELDBCQUE2QixJQUFtQjtJQUUvQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFFakIsZ0JBQXVCLGNBQXdDO1FBRTlELElBQUksS0FBSyxHQUFHLHFCQUFxQixDQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxNQUFNO0tBQ2IsQ0FBQztBQUNILENBQUM7QUFRRCxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXZDLCtCQUFrQyxJQUFtQjtJQUVwRCxJQUFJLE1BQU0sR0FBdUI7UUFDaEMsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsSUFBSTtLQUNWLENBQUM7SUFFRixJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFFM0IsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FDdkIsWUFBWSxFQUNaO1FBQ0MsR0FBRyxZQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUTtZQUVoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FDMUMsQ0FBQztnQkFDQSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FDbkIsQ0FBQztvQkFDQSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBRUQsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRTlCLElBQUksVUFBVSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDekIsQ0FBQztZQUVELGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckIsQ0FBQztLQUNELENBQUMsQ0FBQztJQUVKLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBwcm9jZXNzOiBJQXBwbGljYXRpb25Qcm9jZXNzO1xyXG5cclxuZXhwb3J0IHR5cGUgUGF0aEV4cHJlc3Npb248VCwgVExlYWY+ID0gKHQ6IFQpID0+IFRMZWFmO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPYmplY3RQYXRoPFQ+XHJcbntcclxuXHRwYXRoOiBQcm9wZXJ0eUtleVtdO1xyXG5cdGNoaWxkPFRMZWFmPihwYXRoRXhwcmVzc2lvbjogUGF0aEV4cHJlc3Npb248VCwgVExlYWY+KTogT2JqZWN0UGF0aDxUTGVhZj47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoPFRSb290LCBUTGVhZj4ocGF0aEV4cHJlc3Npb246IFBhdGhFeHByZXNzaW9uPFRSb290LCBUTGVhZj4pOiBQcm9wZXJ0eUtleVtdXHJcbntcclxuXHRsZXQgbGVhZiA9IGdldE9iamVjdFBhdGg8VFJvb3QsIFRMZWFmPihwYXRoRXhwcmVzc2lvbik7XHJcblx0cmV0dXJuIGxlYWYucGF0aDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9iamVjdFBhdGg8VFJvb3QsIFRMZWFmPihwYXRoRXhwcmVzc2lvbjogUGF0aEV4cHJlc3Npb248VFJvb3QsIFRMZWFmPik6IE9iamVjdFBhdGg8VExlYWY+O1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0UGF0aDxUUm9vdD4oKTogT2JqZWN0UGF0aDxUUm9vdD47XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPYmplY3RQYXRoPFRSb290PihwYXRoRXhwcmVzc2lvbj86IFBhdGhFeHByZXNzaW9uPFRSb290LCBhbnk+KTogT2JqZWN0UGF0aDxhbnk+XHJcbntcclxuXHRsZXQgcGF0aCA9IGNyZWF0ZU9iamVjdFBhdGg8VFJvb3Q+KFtdKTtcclxuXHJcblx0aWYgKHR5cGVvZiAocGF0aEV4cHJlc3Npb24pID09PSBcImZ1bmN0aW9uXCIpXHJcblx0e1xyXG5cdFx0cGF0aCA9IHBhdGguY2hpbGQocGF0aEV4cHJlc3Npb24pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdFBhdGg8VD4ocGF0aDogUHJvcGVydHlLZXlbXSk6IE9iamVjdFBhdGg8VD5cclxue1xyXG5cdGxldCBfcGF0aCA9IHBhdGg7XHJcblxyXG5cdGZ1bmN0aW9uIF9jaGlsZDxUTGVhZj4ocGF0aEV4cHJlc3Npb246IFBhdGhFeHByZXNzaW9uPFQsIFRMZWFmPik6IE9iamVjdFBhdGg8VExlYWY+XHJcblx0e1xyXG5cdFx0bGV0IHByb3h5ID0gY3JlYXRlT2JqZWN0UGF0aFByb3h5PFQ+KFtdKTtcclxuXHRcdHBhdGhFeHByZXNzaW9uKHByb3h5LnByb3h5KTtcclxuXHJcblx0XHRsZXQgY2hpbGRQYXRoID0gX3BhdGguY29uY2F0KHByb3h5LnBhdGgpO1xyXG5cdFx0cmV0dXJuIGNyZWF0ZU9iamVjdFBhdGgoY2hpbGRQYXRoKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRwYXRoOiBfcGF0aCxcclxuXHRcdGNoaWxkOiBfY2hpbGRcclxuXHR9O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgT2JqZWN0UGF0aFByb3h5PFQ+XHJcbntcclxuXHRwcm94eTogVDtcclxuXHRwYXRoOiBQcm9wZXJ0eUtleVtdO1xyXG59XHJcblxyXG5jb25zdCBfcHJveHlUYXJnZXQgPSBPYmplY3QuZnJlZXplKHt9KTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdFBhdGhQcm94eTxUPihwYXRoOiBQcm9wZXJ0eUtleVtdKTogT2JqZWN0UGF0aFByb3h5PFQ+XHJcbntcclxuXHRsZXQgcmVzdWx0OiBPYmplY3RQYXRoUHJveHk8VD4gPSB7XHJcblx0XHRwcm94eTogbnVsbCxcclxuXHRcdHBhdGg6IHBhdGhcclxuXHR9O1xyXG5cclxuXHRsZXQgX3Byb3h5QWNjZXNzZWQgPSBmYWxzZTtcclxuXHJcblx0cmVzdWx0LnByb3h5ID0gbmV3IFByb3h5PGFueT4oXHJcblx0XHRfcHJveHlUYXJnZXQsXHJcblx0XHR7XHJcblx0XHRcdGdldCh0YXJnZXQsIHByb3BlcnR5S2V5LCByZWNpZXZlcilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXHRcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRpZiAoX3Byb3h5QWNjZXNzZWQpXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBhcmVudCBhbHJlYWR5IGFjY2Vzc2VkXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdF9wcm94eUFjY2Vzc2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJlc3VsdC5wYXRoLnB1c2gocHJvcGVydHlLZXkpO1xyXG5cclxuXHRcdFx0XHRcdGxldCBjaGlsZFByb3h5ID0gY3JlYXRlT2JqZWN0UGF0aFByb3h5KHJlc3VsdC5wYXRoKTtcclxuXHRcdFx0XHRcdHJldHVybiBjaGlsZFByb3h5LnByb3h5O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0X3Byb3h5QWNjZXNzZWQgPSB0cnVlO1xyXG5cdFx0XHRcdHJlc3VsdC5wYXRoLnB1c2gocHJvcGVydHlLZXkpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0LnByb3h5O1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufVxyXG4iXX0=