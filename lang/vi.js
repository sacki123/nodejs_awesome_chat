export const transValidation = {
    email_incorrect: "Email phải có dạng @mail.com",
    gender_incorrect: "Trường giới tính sai",
    password_incorrect: "Mật khẩu phải chứa ít nhất 8 kí tự bao gồm chữ hoa, chữ thường và ký tự đặc biệt",
    password_confirmation_incorrect: "Mật khẩu nhập lại không chính xác",
    email_name: "email phải có chữ hoàng",
    
}
export const transErrors = {
    account_in_use: "Email này đã được sử dụng",
    account_removed: "Email đã huỷ đăng ký tài khoản",
    account_actived: "Email chưa được Active",
    token_undefined: "Token không tồn tại. ",
    login_failed: "Tài khoản hoặc mật khẩu không chính xác.",
    server_error: "Có lỗi phía Server."
}
export const transSuccess = {
    account_create_success: {
        userCreated: (user)=>{
            return `Tài khoản <strong>${user.username}</strong> đã được tạo thành công, vui lòng kiểm tra email để Active tài khoản.`
            }
        },
    account_actived: "Kích hoạt tài khoản thành công. Bạn đã có thể đăng nhập vào ứng dụng.",
    send_failed: "Có lỗi trong quá trình gửi email",
    loginSuccess: (username)=>{
        return `
        Xin chào ${username}. Chúc bạn một ngày tốt lành.`;
    },
    logout_success: "Đăng xuất thành công."    
}
export const transMail = {
    subject: "Awesome-chat: Xác nhận tài khoản",
    template: (linkVerify) => {
        return `
        <h2>Bạn đã đăng ký tài khoản trên ứng dụng Awesome-chat.</h2>
        <h3>Vui lòng Click vào liên kết bên dưới để xác nhận kích hoạt tài khoản. </>
        <h3><a href="${linkVerify} target="blank">${linkVerify} </a></h3>`;

    }
}    