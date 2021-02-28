'use strict'

// Image Handling
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')

// Database
const db = require('./database.model')

// Routing
const express = require('express')
const app = express()
const router = express.Router()
const path = require('path');
const port = process.env.PORT || 3000;


const upload = multer({
    dest:'images/', 
    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
    
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')


/* Save user supplied image on server under /images */
router.post('/images/upload', (req, res) => {
    console.log("/images/upload")
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            let path = `/images/${req.file.filename}`
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
        }
    })
})

/* Send Image Binary to Client for viewing */
router.get('/images/:imagename', async (req, res) => {
    console.log("/images/:imagename")
    let imagename = req.params.imagename
    let imagepath = __dirname + "/images/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = await fileType.fromFile(imagepath)
    console.log(mime)

	res.writeHead(200, {'Content-Type': mime })
	res.end(image, 'binary')
})

/* Add Shopping Post Object into database */
router.post('/shopping', (req, res) => {
    console.log("/shopping")
	let post = req.body
	let sql = "INSERT INTO shoppingTable (shoppingItem, price, image) VALUES (?,?, ?) ";
	db.run(sql, post.shoppingItem, post.price, (err) => {
		if (err) {
			console.log("DB insert error", err.message);
			throw err;
        } else {
            res.send({message: "Upload Successful!"});
        }
	})
})


/* Get All Shopping Post Object from database */
router.get('/shopping/all', (req, res) => {
    console.log("/shopping/all")
	let sql = "SELECT * FROM shoppingTable";
	db.all(sql, (err, val) => {
		if (err) {
			console.log("DB insert error", err.message);
			throw err;
        } else {
            res.send(val || {});
        }
	})
})


/* Get All Shopping Post Object by id from database */
router.get('/shopping/:id', (req, res) => {
    let postId = req.params.id
	let sql = "SELECT * FROM shoppingTable WHERE id = ?";
	db.get(sql, postId, (err, val) => {
		if (err) {
			console.log("DB insert error", err.message);
			throw err;
        } else {
            res.send(val || {});
        }
	})
})

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})


app.use(express.json());
app.use('/', router)

app.use((err, req, res, next) => {

    if (err.code == 'ENOENT') {
        res.status(404).json({message: 'Image Not Found !'})
    } else {
        res.status(500).json({message:err.message}) 
    } 
})


app.listen(port)
console.log(`App Runs on ${port}`)