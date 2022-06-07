function getParam(param){
  var result = window.location.search.match(new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)"));
  //console.log(result);
  return result ? result[3] : false
}