var express = require('express');
var router = express.Router();
const models = require('../models');
/* POST partners. */
router.post('/get', async function (req, res, next) {
   // const limit = req.query.limit || 10
   // const page = req.query.page || 1
   // // const items = product.all.paginate(page, limit);
   // const regx = new RegExp(`.*${req.query.keyword}.*`, 'i')
   
   // const items = product.all.filter(item=>{
   //    let c_keyword = true
   //    let c_status = true
   //    if (req.query.keyword)
   //       c_keyword = regx.test(item.company) || regx.test(item.cate_number) || regx.test(item.verifier_id)
   //    if (req.query.status!=undefined &&  req.query.status!='')
   //       c_status = item.status == req.query.status
   //    return c_keyword && c_status
   // });

   // res.send({
   //    items: items.paginate(page, limit),
   //    total: items.length
   // });
   const limit = req.body.rowCount || 10
   const offset = req.body.currentPageNo ? limit * (req.body.currentPageNo - 1) : 0
   let sort = {
      'createdAt': -1
   }
   let map = {}
   if (req.body.searchTerm) {
      map["$or"] = [
         {
            companyName: new RegExp(`.*${req.body.searchTerm}.*`, 'i')
         },
         {
            baPartnerId: new RegExp(`.*${req.body.searchTerm}.*`, 'i')
         },
         {
            baAgentNo: new RegExp(`.*${req.body.searchTerm}.*`, 'i')
         },
         {
            contactPersonName: new RegExp(`.*${req.body.searchTerm}.*`, 'i')
         },
      ]
   }
   if (req.body.status !== undefined && req.body.status !== '' && req.body.status !== null) {
      map['status'] = req.body.status
   }
   const total = await models.Partner.countDocuments(map)
   const items = await models.Partner.aggregate([{
      $match: map,
   },
   {
      $sort: sort
   },
   {
      $skip: offset
   },
   {
      $limit: limit
   },
   ])
   res.send(resCode({
      data: {
         totalCount: total,
         data: items
      }
   }));
});

// export xls
router.post('/exporttoexcel', async function (req, res, next) {
   res.send(resCode({ data: { fileStream: 'https://yatirimara.com/files/160001255.xls' } }));
});

module.exports = router;