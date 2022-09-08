async function login() {
  let email = $('#email').val();
  let password = $('#password').val();
  // console.log(email, password);
  try {
    let data = await $.ajax({
      url: '/auth/login',
      type: 'POST',
      data: {
        email,
        password,
      }
    })
    // console.log(data.role);
    if (data.role === "admin") {
      alert('login success')
      window.location.href = '/admin/adminProfile'
    } else if (data.role === "author") {
      alert('login success')
      window.location.href = '/author/authorProfile'
    } else if (data.role === "user") {
      alert('login success')
      window.location.href = '/user/userProfile'
    } else {
      alert('login fail')
      window.location.href = '/auth/viewLogin'
    }
  } catch (e) {
    res.json(e);
  }

}