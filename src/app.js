const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//Paths for Express Config
const publicFileDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const templatesPath = path.join(__dirname,'../templates/partials')
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars(hbs)
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup directory to serve
app.use(express.static(publicFileDirectory));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Prateek Labroo'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Prateek Labroo'
    });
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'Want some help!!!',
        name:'Prateek Labroo'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Location not provided'
        })

    }

    geocode(req.query.search,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                res.send({error});
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.search
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Prateek Labroo',
        errorMessage:'Help article not found!!'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Prateek Labroo',
        errorMessage:'Help page not found'
    });
})


app.listen(3000,()=>{
    console.log("Server started at 3000");
})