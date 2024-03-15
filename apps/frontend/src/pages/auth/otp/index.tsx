// OtpScreen.tsx
import { PortalIcons } from "@components/icons";
import AuthLayout from "@components/layouts/auth_layout";
import { Button } from "@lib";
import { partiallyHideEmail } from "@utils/lib/partialHideEmail";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

const OtpScreen: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    setEmail(router.query.email as string);
  }, [router.query]);

  const handleInputChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && index < otp.length) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box if there's a value and not the last box
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <AuthLayout>
      <div className="otp-container">
        <h2>Enter OTP</h2>
        <br />
        <span>
          An OTP has been sent to{" "}
          <span style={{ color: "#1ab98b" }}>{partiallyHideEmail(email)}</span>
        </span>
        <br />
        <div className="otp-input-container">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              maxLength={1}
              className="otp-input"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <br />
        <div className="inputContainer">
          <Button
            primary={true}
            backgroundColor="#1AB98B"
            icon={
              <PortalIcons selected={false} icon={"right arow"}></PortalIcons>
            }
            label="Verify OTP"
          ></Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default OtpScreen;
