export function checkEmail(email) {
  const re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return re.test(String(email));
}

export function checkPwd(pwd) {
  const re = /^[а-яёa-zA-Z0-9%~_-]{6,40}$/;
  return re.test(String(pwd));
}

export function checkUsername(username) {
  const re = /^[а-яёa-zA-Z0-9]{3,20}$/;
  return re.test(username);
}

export function checkImg(img) {
  const re = /^.{20,100}.(jpg|png|jpeg)$/;
  return re.test(img);
}
