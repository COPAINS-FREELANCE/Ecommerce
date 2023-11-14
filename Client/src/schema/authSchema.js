import * as yup from 'yup';


export const SignupSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4, "password can not be bellow 4 characters").max(25).required("Password can not be empty"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "password does not mutch").required()

})