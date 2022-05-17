const   express = require('express'), //Allows to respond to HTTP requests, defines routing and renders the required content
        fs = require('fs'), //Working with the file system (read and write files)
        http = require('http'), //HTTP Server
        path = require('path'), //Utility that allows us to work with directory paths
        xml2js = require('xml2js'), //This is XML <-> JSON converter
        xmlParse = require('xslt-processor').xmlParse, //Parsing XML
        xsltProcess = require('xslt-processor').xsltProcess; //Processing XSLT

const   router = express(), //Instantiating Express
        server = http.createServer(router); //Instantiating the server

router.use(express.static(path.resolve(__dirname,'views'))); //Serving static content from "views" folder
router.use(express.json()); //Serve json content from external modules

function XMLtoJSON(filename, cb){
    let filepath = path.normalize(path.join(__dirname, filename));
    //Variable create filepath from the required constant above the file we will read to convert
    fs.readFile(filepath, 'utf8', function(err, xmlStr){
        //utilize required file system to read the file in the path described above
        if (err) throw (err);
        //In case any error occurs, send the error information to the console/
        xml2js.parseString(xmlStr, {}, cb);
        //if there is any error, the xml will be transformed to js format/
    });
};

function JSONtoXML(filename, obj, cb) {
    let filepath = path.normalize(path.join(__dirname, filename));
    //Variable create filepath from the required constant above the file we will read to convert
    let builder = new xml2js.Builder();
    // variable builder will store a new object we will write into
    let xml = builder.buildObject(obj);
    // variable to store the final object transformed by the builder.
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
    //transform the new built object to replace it's predecessor with the new information if any (or less).
};

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'}); //Tell the user that the resource exists and which type that is

    let xml = fs.readFileSync('PaddysCafe.xml', 'utf8'), //read in the XML file
        xsl = fs.readFileSync('PaddysCafe.xsl', 'utf8'); //read in the XSL file

        console.log(xml);
        console.log(xsl);

    let doc = xmlParse(xml), //Parse the XML file
        stylesheet = xmlParse(xsl); //Parse the XSL file

    let result = xsltProcess(doc, stylesheet); //Performing XSLT
    console.log(result);
    res.end(result.toString()); //Serve back the user



});

router.post('/post/json', function(req, res) {

    console.log(req.body);
    //open the module to utilize it's functions.
    function appendJSON(obj) {

        console.log(JSON.stringify(obj, null, " "))

        XMLtoJSON('PaddysCafe.xml', function (err, result){
            //runs the function testing the path to the document, if any error informs it in the console.
            if (err) throw (err);
            //if there is any error, the function found the module linkedto this file and will be able to proceed.
            result.menu.section[obj.sec_n].entry.push({'item': obj.item, 'price': obj.price, 'type': obj.type});
            //Utilizes the module function to write into the xml and rewrite the table.
            console.log(JSON.stringify(result, null, " "));
            //shows in the log everything that was written
            JSONtoXML('PaddysCafe.xml', result, function(err){
                //transforms the modified json file into xml again
                if (err) console.log(err);
                //If any error, shows it in the console.
            });

        });

    };
    appendJSON(req.body);
    //runs the append function at the end.

    res.redirect('back');
    //refresh and relad the page
});

router.post('/post/delete', function(req, res){

    console.log(req.body);
    

    function deleteJSON(obj){

        console.log(obj)
        //shows the object being deleted
        XMLtoJSON('PaddysCafe.xml', function(err, result){
            if (err) throw (err);
            //reads the xml information if any error, throws it as usual

            console.log(obj.sec);
            console.log(obj.ent);
            console.log(result);
            
            delete result.menu.section[obj.sec].entry[obj.ent];
            //Delete thhe section specified in the module that has the function.

            JSONtoXML('PaddysCafe.xml', result, function(err){
                //transforms the modified information into xml
                if (err) console.log(err);
            });
        });
    };

    deleteJSON(req.body);
    res.redirect('back');

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    //server created using port 3000 and open to be accessed by any IP
    const addr = server.address();
    //The server address has to be constant, as the page is static and can only be found in one place.
    console.log('Server listening at', addr.address + ':' + addr.port)
    //inform in the terminal the the ip address(es) and port the server is listening to.
});