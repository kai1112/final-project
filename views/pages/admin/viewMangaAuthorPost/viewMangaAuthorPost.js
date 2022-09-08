async function post(id) {
    try {
        let price = $('#price').val()
        console.log(price);
        let data = await $.ajax({
            url: `/manga/createManga/${id}`,
            type: "POST",
            data: {
                price
            }
        })
        if (data.status === 200) {
            alert(data.message);
            window.location.reload();
        }
    } catch (e) {
        console.log(e)
    }
}

async function edit(id, status) {
    try {
        console.log(status);
        if (status === 'posted') {
            alert('ban k the edit manga nay')
        } else {
            window.location.href = `/manga/editMangaAuthor/${id}`
        }
    } catch (e) {
        console.log(e)
    }
}

async function viewDetails(id) {
    window.location.href = `/manga/viewDetailsAuthor/${id}`
}

async function delette(id) {
    try {
        let data1 = await $.ajax({
            url: `/reviewManga/deleteManga/${id}`,
            type: "DELETE",
            data: {
                id,
            },
        });
        if (data1.status === 200) {
            alert('delette successfully')
            window.location.reload();
        }
        // console.log(data1);
    } catch (e) {
        console.log(e)
    }
}