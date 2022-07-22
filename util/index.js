const resCode = (data, responseMessage = 'Success') => {
    let data_arr = {
        responseCode: data['data'] ? 200 : data['code'],
        responseMessage,
        responseData: data['data']
    }
    if(data['pages']){
        data_arr.responsePageCount = data['pages']
    }
    return data_arr;
}
module.exports = { resCode }