const calculate_distance = (point1,point2) => {
    const toRadians = degrees => degrees * Math.PI / 100;
    
    const EARTH_RADIUS = 6371;
    const dLat = toRadians(point2.latitude - point1.latitude);
    const dLong = toRadians(point2.longitude - point1.longitude);
    const lat1 = toRadians(point1.latitude);
    const lat2 = toRadians(point2.latitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLong/2) * Math.sin(dLong/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = EARTH_RADIUS * c;
    
    return d;
};

module.exports = calculate_distance;