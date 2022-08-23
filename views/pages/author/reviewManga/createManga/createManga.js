async function createManga() {
    try {
        let name = $("#name").val();
        const form = $("form")[0];
        const formData = new FormData(form);
        if (name.length > 5) {
            let data = await $.ajax({
                url: "/reviewManga/createManga",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
            });
            if (data.status == 200) {
                console.log("create successful");
                window.location.href = `/reviewManga/viewAllManga`;
            }
        } else {
            alert("nhap name lon hon 5");
        }
    } catch (e) {
        console.log(e);
    }
}