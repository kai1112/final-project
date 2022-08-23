async function changInfo(id)
{   
    let username = $("#username").val();
    const form = $("form")[0];
    const formData = new FormData(form);
    if (username.length > 5) {
      let data = await $.ajax({
        url: `/author/changeProfile/${id}`,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        }
      );
      console.log(data);
      if (data.status == 200) {
        alert("create successful");
        window.location.href = `/auth/changeProfile/${id}`;
      }
    } else {
      alert("nhap name lon hon 5");
    }
}