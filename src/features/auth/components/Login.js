import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { checkUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-20 lg:px-8 ">
        <div className=' bg-indigo-600 h-auto mx-96 rounded-[40px] bg-opacity-10'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm -mt-32">
            <img
              className="mx-auto h-100 w-100"
              src="https://ik.imagekit.io/pctqmbkbp/Logo/black_white_Shop_logo__1_-removebg-preview.png?updatedAt=1707916088892"
              alt="Your Company"
            />
            <h2 className="-mt-32 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Hello Again!
            </h2>
          </div>

          <div className="mt-14 mb-7 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  checkUserAsync({ email: data.email, password: data.password })
                );
              })}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register('email', {
                      required: 'email is required',
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: 'email not valid',
                      },
                    })}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register('password', {
                      required: 'password is required',
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                {error && <p className="text-red-500">{error.message}</p>}
              </div>

              <div className='flex justify-center items-center w-auto'>
                <button
                  type="submit"
                  className="flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
