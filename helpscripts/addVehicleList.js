var multer = require('multer');
let fs = require("fs");
var mime = require('mime-types');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedImages');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage })
const Vehicle = require('../models')("Vehicle");

(async () => {
    var additionalImagesList = [];
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/4bdbb497-e0de-4bdf-839d-271d647912d3.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/4bdbb497-e0de-4bdf-839d-271d647912d3.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/5b9bc69d-a580-4821-abdf-01c97874b4a1.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/5b9bc69d-a580-4821-abdf-01c97874b4a1.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/9a38b724-eed9-497e-adb7-d0b07d0b09d7.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/9a38b724-eed9-497e-adb7-d0b07d0b09d7.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/14b05589-956c-402d-b3f5-6461c8fb0521.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/14b05589-956c-402d-b3f5-6461c8fb0521.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/63a54f1e-433b-4c17-85b9-ea41be294340.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/63a54f1e-433b-4c17-85b9-ea41be294340.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/80b3a723-f7ab-42cf-8b66-5bae424ffd49.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/80b3a723-f7ab-42cf-8b66-5bae424ffd49.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/402849bf-96f5-430c-8886-bb074acbcb8e.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/402849bf-96f5-430c-8886-bb074acbcb8e.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/ab4a6f4e-e509-4f02-928e-ac4bbd2178a4.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/ab4a6f4e-e509-4f02-928e-ac4bbd2178a4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/b2b35ccc-4966-4533-aa5b-d92ecaede9e4.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/b2b35ccc-4966-4533-aa5b-d92ecaede9e4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/b6ecd06c-8020-4145-9f55-86a934802d73.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/b6ecd06c-8020-4145-9f55-86a934802d73.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/b72661d8-e048-4cfc-af33-50250ca874a7.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/b72661d8-e048-4cfc-af33-50250ca874a7.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/dec91292-1b25-41d8-b623-fbc1fc69202b.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/dec91292-1b25-41d8-b623-fbc1fc69202b.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/f6fd165b-47af-4288-8b81-6099b7b3fa58.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/f6fd165b-47af-4288-8b81-6099b7b3fa58.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/f1272e49-0d00-4cb9-814d-b9cc0d21b301.jpg'),
        image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/f1272e49-0d00-4cb9-814d-b9cc0d21b301.jpg').toString('base64'), 'base64'),
    });
    let vehicle1 = new Vehicle({
        maker: 'Ferrari',
        model: '488 GTB',
        color: 'red',
        mainImg: {
            contentType: mime.lookup('./ferrari 488 GTB 2020/cb312f5f-3f85-42fb-ac0e-9042746702b4-1024x768.jpg'),
            image: new Buffer(fs.readFileSync('./ferrari 488 GTB 2020/cb312f5f-3f85-42fb-ac0e-9042746702b4-1024x768.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 2,
        doors: 2,
        transmission: 'Automatic',
        year: 2020,
    });
    await vehicle1.save();
    additionalImagesList = [];
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/279ac4bf-9b58-48a9-874b-b1360e0b661f.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/279ac4bf-9b58-48a9-874b-b1360e0b661f.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/0296db4e-c186-4732-8f4b-b8ee5460eae4.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/0296db4e-c186-4732-8f4b-b8ee5460eae4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/401b9f73-e89c-41b3-a8af-b5caa2e4eea4.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/401b9f73-e89c-41b3-a8af-b5caa2e4eea4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/821e67e7-b667-478b-91ec-8a8b733cb86a.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/821e67e7-b667-478b-91ec-8a8b733cb86a.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/976df8f6-f9b2-4a74-abd4-cd452171158f.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/976df8f6-f9b2-4a74-abd4-cd452171158f.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/59741f4a-7c93-46d5-ab94-f4f9b9d3e1df.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/59741f4a-7c93-46d5-ab94-f4f9b9d3e1df.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/a6bc35c2-47f0-498b-931c-b62b17606786.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/a6bc35c2-47f0-498b-931c-b62b17606786.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/a74e4d7b-faf3-44b9-b8e6-9fc2d1d69077.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/a74e4d7b-faf3-44b9-b8e6-9fc2d1d69077.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/a2321893-d745-4229-b345-1b62ea3ba696.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/a2321893-d745-4229-b345-1b62ea3ba696.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/aecc8dee-5b26-4b1e-a0dd-ccc9d778904a.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/aecc8dee-5b26-4b1e-a0dd-ccc9d778904a.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/d30ad53d-5241-476a-8574-1fc8ef94f657.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/d30ad53d-5241-476a-8574-1fc8ef94f657.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/e840c8ff-955a-4834-8eb2-5793a7ab298c.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/e840c8ff-955a-4834-8eb2-5793a7ab298c.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/ebe257f5-a7a4-49aa-a394-986f3d451fc5.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/ebe257f5-a7a4-49aa-a394-986f3d451fc5.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/ec7c64d3-2ce7-4791-a9f6-d3dcd8d6690e.jpg'),
        image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/ec7c64d3-2ce7-4791-a9f6-d3dcd8d6690e.jpg').toString('base64'), 'base64'),
    });
    let vehicle2 = new Vehicle({
        maker: 'Mercedes-Benz',
        model: 'AMG GTS',
        color: 'gray',
        mainImg: {
            contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/323e1d26-7744-4559-bcdf-4a666df3e1e8-1024x768.jpg'),
            image: new Buffer(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/323e1d26-7744-4559-bcdf-4a666df3e1e8-1024x768.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 2,
        doors: 2,
        transmission: 'Automatic',
        year: 2018,
    });
    await vehicle2.save();
    additionalImagesList = [];
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/0f3892a7-571e-46b3-9d88-c1af61bdca85-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/0f3892a7-571e-46b3-9d88-c1af61bdca85-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/02d20918-1532-422a-91f7-77b00cb7a03c-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/02d20918-1532-422a-91f7-77b00cb7a03c-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/3cc35543-62b8-46d7-b22a-fc7d6ab84560-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/3cc35543-62b8-46d7-b22a-fc7d6ab84560-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/3d6ea177-4b08-4645-aa1a-a72bd3637125-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/3d6ea177-4b08-4645-aa1a-a72bd3637125-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/14d804d0-5de3-4d7b-be6c-1170b5a0ad8e-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/14d804d0-5de3-4d7b-be6c-1170b5a0ad8e-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/16e84957-c6c1-49b3-8ebe-4bc2375df381-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/16e84957-c6c1-49b3-8ebe-4bc2375df381-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/55b5514e-25b5-4120-93ac-87254bdf254e-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/55b5514e-25b5-4120-93ac-87254bdf254e-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/107afae4-8f8f-46e3-92af-c1612732d47d-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/107afae4-8f8f-46e3-92af-c1612732d47d-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/1633cb65-7951-45a7-abdf-cb041dc22f35-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/1633cb65-7951-45a7-abdf-cb041dc22f35-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/7875f6d7-6cda-4c9b-a983-86d00634a092-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/7875f6d7-6cda-4c9b-a983-86d00634a092-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/607243e8-2476-41e3-bb05-8946d4209116-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/607243e8-2476-41e3-bb05-8946d4209116-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/a88bca73-8289-4b16-b8c5-8c891690b1ff-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/a88bca73-8289-4b16-b8c5-8c891690b1ff-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/c44d53ab-fa13-40e1-a996-659b0f510ea7-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/c44d53ab-fa13-40e1-a996-659b0f510ea7-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/c9828c71-937e-4f49-9421-dd5aab595a84-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/c9828c71-937e-4f49-9421-dd5aab595a84-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/c591670d-809d-4428-b768-4f4746b38a61-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/c591670d-809d-4428-b768-4f4746b38a61-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/ea1ffd48-9e0e-4418-bded-724733e19214-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/ea1ffd48-9e0e-4418-bded-724733e19214-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/f3b5a525-a32a-430b-b55a-ef036afd9138-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/f3b5a525-a32a-430b-b55a-ef036afd9138-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/fd8bd92e-de90-44a1-8341-99f795b11b5a-scaled.jpg'),
        image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/fd8bd92e-de90-44a1-8341-99f795b11b5a-scaled.jpg').toString('base64'), 'base64'),
    });
    let vehicle3 = new Vehicle({
        maker: 'Porsche',
        model: 'Cayebbe E Coupe',
        color: 'black',
        mainImg: {
            contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/f71e269a-8ab2-4068-8108-925cc1302bc1-1024x768.jpg'),
            image: new Buffer(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/f71e269a-8ab2-4068-8108-925cc1302bc1-1024x768.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 5,
        doors: 4,
        transmission: 'Automatic',
        year: 2020,
    });
    await vehicle3.save();
    process.exit(0);
})();