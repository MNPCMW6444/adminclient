const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'build')));




app.get('*', (__dirname,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = process.env.PORT || 5990;
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server ready at http://0.0.0.0:${port}`);
});


console.log('App is listening on port ' + port);
