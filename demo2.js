function con_tho_an_co(callback007) {
    setTimeout(function() {
      console.log('con thỏ ăn cỏ, uống nước');
      callback007(); // đây là lúc điệp viên báo cáo cho sếp !
    }, 3000);
  }
  
  // con thỏ chui vô hang
  function hotel() {
    console.log('chui vô hotel');
  }
  
  // điệp viên nằm vùng callback sẽ gọi hotel luôn dùm con thỏ.
  var callback = function() {
    hotel();
  }
  con_tho_an_co(callback);