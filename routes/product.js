var express = require('express');
var router = express.Router();
var product = require('../db/product')
/* GET product listing. */
// get
router.get('/', async function (req, res, next) {
  const limit = req.query.limit || 10
  const page = req.query.page || 1
  // const items = product.all.paginate(page, limit);
  const regx = new RegExp(`.*${req.query.keyword}.*`, 'i')
  
  const items = product.all.filter(item=>{
    let c_keyword = true
    let c_status = true
    if (req.query.keyword)
      c_keyword = regx.test(item.company) || regx.test(item.cate_number) || regx.test(item.verifier_id)
    if (req.query.status!=undefined &&  req.query.status!='')
      c_status = item.status == req.query.status
    return c_keyword && c_status
  });

  res.send({
    items: items.paginate(page, limit),
    total: items.length
  });
});

router.get('/:id', async function (req, res, next) {
  const da = product.findById(req.params.id)
  res.send(da);
});


// create
router.post('/', function (req, res, next) {
  const data = product.create(req.body)
  res.send(data);
});

// update
router.put('/:id', async function (req, res, next) {
  console.log(req.body, "req.body Put");
  let da = product.findByIdAndUpdate(req.params.id, req.body)  
  res.send(da);
});

// delete
router.delete('/:id', async function (req, res, next) {
  let status = product.findByIdAndDelete(req.params.id)
  res.send({
    success: status
  });
});

module.exports = router;