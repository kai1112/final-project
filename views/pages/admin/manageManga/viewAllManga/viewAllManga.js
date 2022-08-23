async function edit(id) {
    window.location.href = `/manga/editManga/${id}`
}

async function viewDetails(id) {
    window.location.href = `/manga/viewDetailManga/${id}`
}

async function delette(id) {
    try {
        let data1 = await $.ajax({
            url: `/manga/deleteManga/${id}`,
            type: "DELETE",
            data: {
                id,
            },
        });
        if (data.status === 200) {
            alert('delette successfully')
            window.location.reload();
        }
        // console.log(data1);
    } catch (e) {
        console.log(e)
    }
}