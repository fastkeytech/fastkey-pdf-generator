var AMAZON_REGION="ca-central-1"
var AMAZON_ACCESS_KEY="insert-key-here"
var AMAZON_ACCESS_SECRET_KEY="insert-key-here"
var BUCKET_NAME="fastkey-qa-s3"
var express = require("express");
const fs = require('fs');
const AWS = require('aws-sdk');
var httpStatus= require("http-status");
var bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const htmlPDF = require('puppeteer-html-pdf'); 
var app = express();
/*const s3 = new AWS.S3({
    accessKeyId: AMAZON_ACCESS_KEY,
    secretAccessKey: AMAZON_ACCESS_SECRET_KEY
}); 
const  uploadFile = async (fileName,path) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: path, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    const data=await s3.upload(params, function(err) {
        if (err) {
            throw err;
        }
        console.log(data.Location);

    }).promise();
        return data.Location;
};*/
app.listen(3000, () => {
 console.log("Server running on port 3000");

});
process.on('uncaughtException', function(err) { 
    // Handle the error safely 
})

app.use(bodyParser.text({type: '*/*'}));
app.post("/generate-pdf/:reportid/:reporttype", (req, res) => {
 let data = req.body;
//data='<p>Test</p>' 
//console.log(data); 
res.contentType("application/json");
(async () => {
  let footerCode=`<div style="display:block;margin: auto;">`;
  if(req.params.reporttype=='criminal-record'){
        footerCode+=`<div style="margin:20px; font-size:7px; text-align:justify;">Please note that this report does not reflect Fastkey's opinions, support, or predictions about the applicant's fina>
} else{
        footerCode+=`<div style="margin:20px; font-size:7px; text-align:justify;">Please note that this report does not reflect Fastkey's opinions, support, or predictions about the applicant's fina>
}   
if(req.params.reporttype!='cra-summary' && req.params.reporttype!='midpage'){
        footerCode+=`<div style="text-align:center; font-size:7px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
}
footerCode+=`</div>`;
  const options = { 
    format: 'A4',
    path: `result.pdf`, // you can pass path to save the file
    displayHeaderFooter:true,
    margin: {
      bottom:'110px',
      top:'20px'
    },
    footerTemplate:footerCode
  }
  binaryBuf=await htmlPDF.create(data, options);
 // const path=await uploadFile('result.pdf','pdfs/'+req.params.reportid+'/'+req.params.reporttype+'.pdf'); 
res.contentType("application/pdf");
        res.send(binaryBuf);
  })();
});
