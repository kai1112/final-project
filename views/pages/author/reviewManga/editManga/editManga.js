async function edit() {
    try {
        let id = window.location.href.split('/')[5]
        // console.log(id);
        const form = $("form")[0];
        const formData = new FormData(form);
        let data = await $.ajax({
            url: `/reviewManga/editManga/${id}`,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
        });
        if (data.status == 200) {
            console.log("create successful");
            window.location.href = `/reviewManga/viewAllManga`;
        }
    } catch (e) {
        console.log(e);
    }
}