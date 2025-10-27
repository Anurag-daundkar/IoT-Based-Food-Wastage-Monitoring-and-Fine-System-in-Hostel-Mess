import React from 'react'

const Testing = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const userData = JSON.parse(localStorage.getItem(data.email));
        if (userData) {
            if (userData.password === data.password) {
                console.log(userData.name + " You Are Successfully Logged In");
            } else {
                console.log("Email or Password is not matching with our record");
            }
        } else {
            console.log("Email or Password is not matching with our record");
        }
    };


  return (
    <div className='h-500'>

                    <div class=" fixed w-full flex justify-center bg-green-50 p-20">
                        <div class="bg-white rounded-xl w-110 shadow-xl">
                            <div class="p-8">
                                <div class="flex items-center justify-between mb-6">
                                    <h2 class="text-2xl font-bold text-gray-900">Sign In</h2><button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer" onClick={()=>{
                                        setstudent(false)
                                    }}>
                                        <div class="w-16 h-16 flex items-center justify-center">
                                        </div>
                                    </button>
                                </div>
                <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                />
                {errors.email && <span style={{ color: "red" }}>*Email* is mandatory</span>}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}

                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
                            </div>
                        </div>
                    </div>
    </div>
  )
}

export default Testing
