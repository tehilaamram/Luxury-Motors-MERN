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
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/4bdbb497-e0de-4bdf-839d-271d647912d3.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/5b9bc69d-a580-4821-abdf-01c97874b4a1.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/5b9bc69d-a580-4821-abdf-01c97874b4a1.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/9a38b724-eed9-497e-adb7-d0b07d0b09d7.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/9a38b724-eed9-497e-adb7-d0b07d0b09d7.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/14b05589-956c-402d-b3f5-6461c8fb0521.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/14b05589-956c-402d-b3f5-6461c8fb0521.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/63a54f1e-433b-4c17-85b9-ea41be294340.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/63a54f1e-433b-4c17-85b9-ea41be294340.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/80b3a723-f7ab-42cf-8b66-5bae424ffd49.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/80b3a723-f7ab-42cf-8b66-5bae424ffd49.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/402849bf-96f5-430c-8886-bb074acbcb8e.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/402849bf-96f5-430c-8886-bb074acbcb8e.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/ab4a6f4e-e509-4f02-928e-ac4bbd2178a4.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/ab4a6f4e-e509-4f02-928e-ac4bbd2178a4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/b2b35ccc-4966-4533-aa5b-d92ecaede9e4.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/b2b35ccc-4966-4533-aa5b-d92ecaede9e4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/b6ecd06c-8020-4145-9f55-86a934802d73.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/b6ecd06c-8020-4145-9f55-86a934802d73.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/b72661d8-e048-4cfc-af33-50250ca874a7.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/b72661d8-e048-4cfc-af33-50250ca874a7.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/dec91292-1b25-41d8-b623-fbc1fc69202b.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/dec91292-1b25-41d8-b623-fbc1fc69202b.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/f6fd165b-47af-4288-8b81-6099b7b3fa58.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/f6fd165b-47af-4288-8b81-6099b7b3fa58.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./ferrari 488 GTB 2020/f1272e49-0d00-4cb9-814d-b9cc0d21b301.jpg'),
        image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/f1272e49-0d00-4cb9-814d-b9cc0d21b301.jpg').toString('base64'), 'base64'),
    });
    let vehicle1 = new Vehicle({
        maker: 'Ferrari',
        model: '488 GTB',
        color: 'red',
        mainImg: {
            contentType: mime.lookup('./ferrari 488 GTB 2020/cb312f5f-3f85-42fb-ac0e-9042746702b4-1024x768.jpg'),
            image: Buffer.from(fs.readFileSync('./ferrari 488 GTB 2020/cb312f5f-3f85-42fb-ac0e-9042746702b4-1024x768.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 2,
        doors: 2,
        transmission: 'Automatic',
        year: 2020,
        price: 355209,
        quantity: 5,

    });
    await vehicle1.save();
    additionalImagesList = [];
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/279ac4bf-9b58-48a9-874b-b1360e0b661f.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/279ac4bf-9b58-48a9-874b-b1360e0b661f.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/0296db4e-c186-4732-8f4b-b8ee5460eae4.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/0296db4e-c186-4732-8f4b-b8ee5460eae4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/401b9f73-e89c-41b3-a8af-b5caa2e4eea4.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/401b9f73-e89c-41b3-a8af-b5caa2e4eea4.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/821e67e7-b667-478b-91ec-8a8b733cb86a.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/821e67e7-b667-478b-91ec-8a8b733cb86a.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/976df8f6-f9b2-4a74-abd4-cd452171158f.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/976df8f6-f9b2-4a74-abd4-cd452171158f.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/59741f4a-7c93-46d5-ab94-f4f9b9d3e1df.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/59741f4a-7c93-46d5-ab94-f4f9b9d3e1df.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/a6bc35c2-47f0-498b-931c-b62b17606786.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/a6bc35c2-47f0-498b-931c-b62b17606786.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/a74e4d7b-faf3-44b9-b8e6-9fc2d1d69077.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/a74e4d7b-faf3-44b9-b8e6-9fc2d1d69077.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/a2321893-d745-4229-b345-1b62ea3ba696.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/a2321893-d745-4229-b345-1b62ea3ba696.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/aecc8dee-5b26-4b1e-a0dd-ccc9d778904a.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/aecc8dee-5b26-4b1e-a0dd-ccc9d778904a.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/d30ad53d-5241-476a-8574-1fc8ef94f657.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/d30ad53d-5241-476a-8574-1fc8ef94f657.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/e840c8ff-955a-4834-8eb2-5793a7ab298c.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/e840c8ff-955a-4834-8eb2-5793a7ab298c.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/ebe257f5-a7a4-49aa-a394-986f3d451fc5.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/ebe257f5-a7a4-49aa-a394-986f3d451fc5.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/ec7c64d3-2ce7-4791-a9f6-d3dcd8d6690e.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/ec7c64d3-2ce7-4791-a9f6-d3dcd8d6690e.jpg').toString('base64'), 'base64'),
    });
    let vehicle2 = new Vehicle({
        maker: 'Mercedes-Benz',
        model: 'AMG GTS',
        color: 'gray',
        mainImg: {
            contentType: mime.lookup('./Mercedes-Benz AMG GTS 2018/323e1d26-7744-4559-bcdf-4a666df3e1e8-1024x768.jpg'),
            image: Buffer.from(fs.readFileSync('./Mercedes-Benz AMG GTS 2018/323e1d26-7744-4559-bcdf-4a666df3e1e8-1024x768.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 2,
        doors: 2,
        transmission: 'Automatic',
        year: 2018,
        price: 132400,
        quantity: 10,
    });
    await vehicle2.save();
    additionalImagesList = [];
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/0f3892a7-571e-46b3-9d88-c1af61bdca85-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/0f3892a7-571e-46b3-9d88-c1af61bdca85-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/02d20918-1532-422a-91f7-77b00cb7a03c-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/02d20918-1532-422a-91f7-77b00cb7a03c-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/3cc35543-62b8-46d7-b22a-fc7d6ab84560-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/3cc35543-62b8-46d7-b22a-fc7d6ab84560-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/3d6ea177-4b08-4645-aa1a-a72bd3637125-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/3d6ea177-4b08-4645-aa1a-a72bd3637125-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/14d804d0-5de3-4d7b-be6c-1170b5a0ad8e-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/14d804d0-5de3-4d7b-be6c-1170b5a0ad8e-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/16e84957-c6c1-49b3-8ebe-4bc2375df381-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/16e84957-c6c1-49b3-8ebe-4bc2375df381-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/55b5514e-25b5-4120-93ac-87254bdf254e-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/55b5514e-25b5-4120-93ac-87254bdf254e-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/107afae4-8f8f-46e3-92af-c1612732d47d-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/107afae4-8f8f-46e3-92af-c1612732d47d-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/1633cb65-7951-45a7-abdf-cb041dc22f35-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/1633cb65-7951-45a7-abdf-cb041dc22f35-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/7875f6d7-6cda-4c9b-a983-86d00634a092-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/7875f6d7-6cda-4c9b-a983-86d00634a092-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/607243e8-2476-41e3-bb05-8946d4209116-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/607243e8-2476-41e3-bb05-8946d4209116-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/a88bca73-8289-4b16-b8c5-8c891690b1ff-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/a88bca73-8289-4b16-b8c5-8c891690b1ff-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/c44d53ab-fa13-40e1-a996-659b0f510ea7-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/c44d53ab-fa13-40e1-a996-659b0f510ea7-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/c9828c71-937e-4f49-9421-dd5aab595a84-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/c9828c71-937e-4f49-9421-dd5aab595a84-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/c591670d-809d-4428-b768-4f4746b38a61-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/c591670d-809d-4428-b768-4f4746b38a61-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/ea1ffd48-9e0e-4418-bded-724733e19214-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/ea1ffd48-9e0e-4418-bded-724733e19214-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/f3b5a525-a32a-430b-b55a-ef036afd9138-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/f3b5a525-a32a-430b-b55a-ef036afd9138-scaled.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/fd8bd92e-de90-44a1-8341-99f795b11b5a-scaled.jpg'),
        image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/fd8bd92e-de90-44a1-8341-99f795b11b5a-scaled.jpg').toString('base64'), 'base64'),
    });
    let vehicle3 = new Vehicle({
        maker: 'Porsche',
        model: 'Cayebbe E Coupe',
        color: 'black',
        mainImg: {
            contentType: mime.lookup('./Porsche Cayebbe E Coupe 2020/f71e269a-8ab2-4068-8108-925cc1302bc1-1024x768.jpg'),
            image: Buffer.from(fs.readFileSync('./Porsche Cayebbe E Coupe 2020/f71e269a-8ab2-4068-8108-925cc1302bc1-1024x768.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 5,
        doors: 4,
        transmission: 'Automatic',
        year: 2020,
        price: 100000,
        quantity: 20,
    });
    await vehicle3.save();

    additionalImagesList = [];
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/6faf373f-62bd-41f4-be90-5bff11701f09.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/6faf373f-62bd-41f4-be90-5bff11701f09.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/7fe20c84-580c-4c7c-8e22-f4b8dafee187.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/7fe20c84-580c-4c7c-8e22-f4b8dafee187.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/19897613-29cc-436b-b17f-eec1cf75b577.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/19897613-29cc-436b-b17f-eec1cf75b577.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/10a66c47-45da-4e9f-8927-ae7e34df301d.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/10a66c47-45da-4e9f-8927-ae7e34df301d.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/64bb2bad-a2cc-43ae-b4b8-35d5280c3f7e.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/64bb2bad-a2cc-43ae-b4b8-35d5280c3f7e.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/755d3aae-170c-437a-90aa-4cc44892b338.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/755d3aae-170c-437a-90aa-4cc44892b338.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/0823edf7-fae2-4f4e-903e-26daf0062c17.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/0823edf7-fae2-4f4e-903e-26daf0062c17.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/1216d480-6049-4f68-a9c9-306321df189a.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/1216d480-6049-4f68-a9c9-306321df189a.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/a3891255-691f-4c2b-b8fc-a5e6796a1f89.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/a3891255-691f-4c2b-b8fc-a5e6796a1f89.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/b5341a97-bda0-416c-9088-26bfd824f894.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/b5341a97-bda0-416c-9088-26bfd824f894.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Range Rover Sport SVR 2020/d8199391-d796-43c3-bfa8-c98be2a83f89.jpg'),
        image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/d8199391-d796-43c3-bfa8-c98be2a83f89.jpg').toString('base64'), 'base64'),
    });

    let vehicle4 = new Vehicle({
        maker: 'RANGE ROVER',
        model: 'Sport SVR',
        color: 'white',
        mainImg: {
            contentType: mime.lookup('./Range Rover Sport SVR 2020/e0f7b702-9a4a-4238-8bf7-04292d11ce06.jpg'),
            image: Buffer.from(fs.readFileSync('./Range Rover Sport SVR 2020/e0f7b702-9a4a-4238-8bf7-04292d11ce06.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 5,
        doors: 4,
        transmission: 'Automatic',
        year: 2020,
        price: 900000,
        quantity: 20,
    });
    await vehicle4.save();


    additionalImagesList = [];
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/cf69193d-3861-4e4b-9536-6b4af382bf2a.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/cf69193d-3861-4e4b-9536-6b4af382bf2a.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/b654f1f7-e218-4e3d-bdb0-bc35e03ecc33.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/b654f1f7-e218-4e3d-bdb0-bc35e03ecc33.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/c8cfcaf3-b1a6-45ed-bbac-0aaccd3aeccc.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/c8cfcaf3-b1a6-45ed-bbac-0aaccd3aeccc.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/86bab565-59d5-4b86-92af-be82b2f8ef2e.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/86bab565-59d5-4b86-92af-be82b2f8ef2e.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/14e8b648-5986-4a40-8217-1cb2e28d3f02.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/14e8b648-5986-4a40-8217-1cb2e28d3f02.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/9c8e1b80-2ea9-4d97-ab46-e978eb17ad66.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/9c8e1b80-2ea9-4d97-ab46-e978eb17ad66.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/7aba571a-a014-4f49-baa8-07b8ecd47964.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/7aba571a-a014-4f49-baa8-07b8ecd47964.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/6e62bfad-89e0-4f39-be0c-1b7dc395a95a.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/6e62bfad-89e0-4f39-be0c-1b7dc395a95a.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/04ad2f3e-a16a-431f-9d4e-1834ee6c68d8.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/04ad2f3e-a16a-431f-9d4e-1834ee6c68d8.jpg').toString('base64'), 'base64'),
    });
    additionalImagesList.push({
        contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/00a56ecb-3d04-4b3c-819b-8c035d941bcd.jpg'),
        image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/00a56ecb-3d04-4b3c-819b-8c035d941bcd.jpg').toString('base64'), 'base64'),
    });
    let vehicle5 = new Vehicle({
        maker: 'Mercedes-Benz',
        model: 'GT-C ROADSTER',
        color: 'black',
        mainImg: {
            contentType: mime.lookup('./Mercedes-Benz GT-C ROADSTER 2020/282932ad-e679-4a16-9874-cf280c1b373d-1024x768.jpg'),
            image: Buffer.from(fs.readFileSync('./Mercedes-Benz GT-C ROADSTER 2020/282932ad-e679-4a16-9874-cf280c1b373d-1024x768.jpg').toString('base64'), 'base64'),
        },
        additionalImg: additionalImagesList,
        seats: 2,
        doors: 2,
        transmission: 'Automatic',
        year: 2018,
        price: 150000,
        quantity: 10,
    });
    await vehicle5.save();

    process.exit(0);
})();