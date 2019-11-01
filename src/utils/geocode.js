const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhdGVla2xhYnJvbyIsImEiOiJjazF0bGhtdGUwN3B5M2RvOXVoMjRob3NkIn0.GLCe5LCkzfs-4QVnwO4arw';

    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback('Not connected to internet!!',undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location,try another search!!',undefined);
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}


module.exports=geocode;