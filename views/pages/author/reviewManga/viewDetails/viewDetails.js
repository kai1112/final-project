function viewDetailChapter(id) {
  window.location.href = `/reviewChapter/viewDetailChapter/${id}`;
}

function createChapter(id) {
  window.location.href = `/reviewChapter/createChapter/${id}`;
}

function edichapter(id, status) {
  if (status === 'posted') {
    alert('khong the edichapter')
  } else {
    window.location.href = `/reviewChapter/editChapterAuthor/${id}`;
  }
}

async function deleteChapter(id) {
  let mangaId = window.location.href.split("/")[5];
  try {
    let data1 = await $.ajax({
      url: `/reviewChapter/deleteChapter/${id}`,
      type: "DELETE",
      data: {
        id,
      },
    });
    // console.log(data1);
    window.location.href = `/reviewManga/viewDetails/${mangaId}`;
  } catch (error) {
    console.log(error);
  }
}

async function post(id) {
  try {
    let price = $('#price').val()
    let data = await $.ajax({
      url: `/chapter/createChapter/${id}`,
      type: "POST",
    })
    if (data.status === 200) {
      alert('create Chapter successfully')
      window.location.reload()
    }
  } catch (e) {
    console.log(e)
  }
}
