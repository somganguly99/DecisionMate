import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const SignInButton: React.FC = () => {
  const handleSuccess = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);
    // TODO: Send token to backend for verification
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default SignInButton;
