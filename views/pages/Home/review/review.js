async function readMore(monney, price, checked) {
    let id = window.location.href.split('/')[4]
    let chap = window.location.href.split('/')[5]
    console.log(83, 'a');
    try {
        if (price > 0 && !monney) {
            if (confirm('ban can dang nhap de su dung tinh nang nay')) {
                sessionStorage.setItem("href", `/manga/${id}/${chap}/review`);
                window.location.href = '/auth/viewLogin'
            }
        } else if (price > 0 && monney) {
            if (checked == "true") {
                //console.log(69);
                window.location.href = `/manga/${id}/${chap}`
            } else if (monney < price) {
                alert('ban chua du tien de mua truyen')
            } else {
                if (confirm('ban co muon mua chuyen khong')) {
                    window.location.href = `/manga/${id}/${chap}`
                    alert('mua truyen thanh cong')
                }
            }
        } else {
            window.location.href = `/manga/${id}/${chap}`
        }
    } catch (e) {
        console.log(e);
    }
}