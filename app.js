var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mapContainerNode = document.getElementById("map");
var map;
function initMap(position) {
    map = new google.maps.Map(mapContainerNode, {
        center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        },
        zoom: 15
    });
}
function getMyPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
            resolve(position);
        }, function (error) {
            reject(error);
        });
    });
}
function addMarkers(locations) {
    for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
        var location_1 = locations_1[_i];
        new google.maps.Marker({
            position: {
                lat: location_1.location.latitude,
                lng: location_1.location.longitude
            },
            map: map,
            label: location_1.name
        });
    }
}
function getLocationTypes() {
    return fetch('https://www.vullum.io/academy/oslo.json')
        .then(function (response) { return response.json(); });
}
function getLocations(url) {
    return fetch(url)
        .then(function (response) { return response.json(); });
}
function getFlattenedLocations() {
    return getLocationTypes()
        .then(function (locationTypes) {
        var locationUrls = locationTypes
            .map(function (locationType) { return locationType.locations; });
        var locationPromises = locationUrls
            .map(function (url) { return getLocations(url); });
        var locations = Promise.all(locationPromises)
            .then(function (locationCollection) {
            return locationCollection.flat();
        });
        return locations;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var myPosition, locations, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getMyPosition()];
                case 1:
                    myPosition = _a.sent();
                    initMap(myPosition);
                    return [4 /*yield*/, getFlattenedLocations()];
                case 2:
                    locations = _a.sent();
                    addMarkers(locations);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
