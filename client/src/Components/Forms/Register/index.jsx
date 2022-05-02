import {useState } from "react";
import clsx from "clsx";

import styles from "../Form.module.scss";
import { isRequired } from "../validator.jsx";


function Register() {
  const [name, setName] = useState('');
  const [nameMsg, setNameMsg] = useState();
  const [birth, setBirth] = useState('');
  const [birthMsg, setBirthMsg] = useState();
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('male');
  const [identification, setIdentification] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// Validate form


  // Handle submit
  const handleSubmit = () => {
    console.log({
      name,
      birth,
      address,
      gender,
      identification,
      email,
      password
    })

    setName('')
    setBirth('')
    setAddress('')
    setGender('')
    setIdentification('')
    setEmail('')
    setPassword('')
  }




  return (
    <div className="bg-primary">
      <h1 className="text-center brand-form">
        Love Travel
        <p className="brand-form__line"></p>
      </h1>

      <div id={clsx(styles.registerForm)}>
        <h1 className="text-center">Đăng ký</h1>

        {/* Name */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="name" className={clsx(styles.formLabel)}>Họ tên:</label>
          <input id="name" type="text" name="registerName" placeholder="VD: Đào Tài"
            className={clsx(styles.formControl)}
            value={name}
            onChange={e => setName(e.target.value.trim())}
            onBlur={() => setNameMsg(isRequired(name))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>{nameMsg}</span>
        </div>

        {/* BirthDate */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="birthDate" className={clsx(styles.formLabel)}>Ngày sinh:</label>
          <input id="birthDate" type="date" name="registerBirthDate"
            className={clsx(styles.formControl)}
            value={birth}
            onChange={e => setBirth(e.target.value.trim())}
            onBlur={() => setBirthMsg(isRequired(birth))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>{birthMsg} </span>
        </div>

        {/* Address */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="address" className={clsx(styles.formLabel)}>Địa chỉ:</label>
          <input id="address" type="text" name="registerAddress"  placeholder="Nhập địa chỉ"
            className={clsx(styles.formControl)}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}> </span>
        </div>

        {/* Gender */}
        <div className={clsx("row", styles.formGroup)}>
          <label className={clsx("col c-4", styles.formLabel)}>Giới tính:</label>
          <div className="row col c-4">
            <label className={clsx(styles.formLabel)} htmlFor="gender__male">Nam</label>
            <input id="gender__male" type="radio" name="registerGender"
              checked={gender === 'male'}
              onChange={e => setGender('male')}
            />
          </div>
          <div className="row col c-4">
            <label className={clsx(styles.formLabel)} htmlFor="gender__female">Nữ</label>
            <input id="gender__female" type="radio" name="registerGender"
              checked={gender === 'female'}
              onChange={e => setGender('female')}
            />
          </div>
          <span className={clsx(styles.formMsg, styles.formMsgError)}> </span>
        </div>

        {/* CCCD */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="identification" className={clsx(styles.formLabel)}>CCCD:</label>
          <input id="identification" type="text" name="registerIdentification" placeholder="Nhập CCCD"
            className={clsx(styles.formControl)}
            value={identification}
            onChange={e => setIdentification(e.target.value.trim())}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}> </span>
        </div>

        {/* Email */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="email" className={clsx(styles.formLabel)}>Email:</label>
          <input id="email" type="email" name="registerEmail" placeholder="VD: daotai123@gmail.com"
            className={clsx(styles.formControl)}
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}> </span>
        </div>

         {/* Password */}
         <div className={clsx(styles.formGroup)}>
          <label htmlFor="password" className={clsx(styles.formLabel)}>Mật khẩu:</label>
          <input id="password" type="password" name="registerPassword" 
            className={clsx(styles.formControl)}
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}> </span>
        </div>

        <div className={clsx(styles.formGroup)}>
          <button className={clsx(styles.btnRegister)}
              onClick={handleSubmit}
          >
          Đăng ký</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
