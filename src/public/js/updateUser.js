let userAvatar = null;
let userInfo = {};
function updateUserInfo(){
    $("#input-change-avatar").bind("change", function(){
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576; //byte = 1MB
        // if ($.inArray(fileData.type, math) === -1){
        //     alertify.notify("Kiểu file không hợp lệ. Chỉ chấp nhận JPG, PNG.", "error",7);
        //     $(this).val(null);
        //     return false;
        // }
        // if (fileData.size > limit){
        //     alertify.notify("Ảnh upload tối đa là 1MB", "error",7);
        //     $(this).val(null);
        //     return false;
    // }
    if (typeof(FileReader) != "undefined"){
        let imagePreview = $("#image-edit-profile");//Thẻ div chứa thẻ img
        imagePreview.empty();//Xoá các thẻ con của thẻ div
        let fileReader = new FileReader();
        //Tạo một đối tượng img sau đó chèn vào thẻ div phía bên trên
        fileReader.onload = function(element){
            $("<img>", {
                "src": element.target.result,
                "class": "avatar img-circle",
                "id": "user-modal-avatar",
                "alt": "avatar"
            }).appendTo(imagePreview);
        }
        imagePreview.show();
        fileReader.readAsDataURL(fileData);
        let formData = new FormData();
        formData.append("avatar", fileData);
        userAvatar = formData;
    } else {
        alertify.notify("Trình duyệt không hỗ trợ Filereader", "error", 7);
    }
});
    $("#input-change-username").bind("change", function(){
        userInfo.username = $(this).val();
    });
    $("#input-change-gender-male").bind("click", function(){
        userInfo.gender = $(this).val();
    });
    $("#input-change-gender-female").bind("click", function(){
        userInfo.gender = $(this).val();
    });
    $("#input-change-address").bind("change", function(){
        userInfo.address = $(this).val();
    });
    $("#input-change-phone").bind("change", function(){
        userInfo.phone = $(this).val();
    });
}
$(document).ready(function(){
    updateUserInfo();
    originAvatarSrc = $("#user-modal-avatar").attr("src");
    $("#input-btn-update-user").bind("click", function(){
        if ($.isEmptyObject(userInfo) && !userAvatar){
            alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu.", "error", 7);
            return false;
        }
        $.ajax({
            url: "/user/update-avatar",
            type: "put",
            cache: false,
            contentType: false,
            processData: false,
            data: userAvatar,
            success: function(result){
                console.log(result);
                //display success
                $(".user-modal-alert-success").find("span").text(result.message);
                $(".user-modal-alert-success").css("display", "block");
                //update avatar at navbar
                $("#navbar-avatar").attr("src", result.imageSrc)
                //update origin avatar src
                originAvatarSrc = result.imageSrc;
                 //reset image
                 $("#input-btn-cancel-update-user").click();
            },
            error: function(error){
                $(".user-modal-alert-error").find("span").text(error.responseText);
                $(".user-modal-alert-error").css("display", "block");
                //reset image
                $("#input-btn-cancel-update-user").click();
            }
        })
    });
    $("#input-btn-cancel-update-user").bind("click", function(){
        userAvatar = null;
        userInfo = {};
        $("#input-change-avatar").val(null);
        $("#user-modal-avatar").attr("src", originAvatarSrc);

    })
})