import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupSchema } from '../schema/authSchema'
import { SendToSignup } from '../actions/AuthActions'

const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(SignupSchema) })

    const onSubmitHandler = async (data) => {
        try {

            const dataFromServer = await SendToSignup(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=' bg-gray-500 '>
            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
                    <form
                        onSubmit={handleSubmit(onSubmitHandler)}
                        className="flex flex-col">
                        <div className="flex space-x-4 mb-4">
                            <input
                                placeholder="First Name"
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text"
                                {...register("first_name")}
                            />
                            <p >{errors.first_name?.message}</p>
                            <input
                                placeholder="Last Name"
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text"
                                {...register("last_name")}
                            />
                            <p>{errors.last_name?.message}</p>
                        </div>
                        <input
                            placeholder="Email"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="email"
                            {...register("email")}
                        />
                        <p>{errors.email?.message}</p>

                        <input
                            placeholder="Password"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="password"
                            {...register("password")}
                        />
                        <p>{errors.password?.message}</p>
                        <input
                            placeholder="Confirm Password"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="password"
                            {...register("confirmPassword")}
                        />
                        <p>{errors.confirmPassword?.message}</p>

                        <p className="text-white mt-4">
                            Already have an account?
                            <Link className="text-sm text-blue-500 -200 hover:underline mt-4" to="/auth/login">
                                Login</Link>

                        </p>
                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup



