const headers = ['x-auth-token'];//Bu sınıf header Bilgisindeki eksiklikleri doldurmak için kullanılır
module.exports = (h) => {
    let array={}

headers.forEach(header => {
    if(h.header(header)){
        array[header]=h.header(header);
    }

});

return array;
}


