const request = require('request');

const forecast = (latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/f8c94b17cff906538c0963383f301b43/'+ latitude + ',' + longitude + '?units=si';

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Not connected to net!!',undefined);
        }else if(body.error){
            callback('Unable to find location,try another search!!',undefined);
        }else{
            callback(undefined,body.daily.data[0].summary+ ' It is currently '+ body.currently.temperature + ' degrees out.There is ' + body.currently.precipProbability + '% chance of rain');
        }
    })
}

module.exports=forecast;