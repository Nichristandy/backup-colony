import {
    Action,
    AnyAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { RootState } from '../../store';
import { setCookie, deleteCookie } from 'cookies-next';

// here we are typing the types for the state
export type AuthState = {
    data: {
        user: any,
        accessToken: string,
        refreshToken: string,
        access: string
    };
    isLogin: boolean;
    pending: boolean;
    error: boolean;
    message: any;
};

const initialState: AuthState = {
    data: {
        user: {},
        accessToken: "",
        refreshToken: "",
        access: ""
    },
    isLogin: false,
    pending: false,
    error: false,
    message: "",
};

interface HeadersConfiguration {
    headers: {
        "Content-Type"?: string;
        "Accept"?: string
        "Authorization"?: string
    }
}

let config: HeadersConfiguration = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
};

interface AuthData {
    data: any;
    callback: () => void
}

interface AccessData {
    id?: number | string;
    params?: any;
    data?: any;
    token?: any;
    callback: () => void
}

interface MyData {
    token?: any,
    callback: () => void
}

// rejection
interface RejectedAction extends Action {
    error: Error
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('rejected')
}

// Login
export const webLogin = createAsyncThunk<any, AuthData, { state: RootState }>('auth/web/login', async (params, { getState }) => {
    try {
        const response = await axios.post("auth/web/login", params.data, config);
        const { data, status } = response;
        if (status == 200) {
            toast.dark("Sign in successfully!")
            setCookie('accessToken', data?.accessToken, { secure: true, maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', data?.refreshToken, { secure: true, maxAge: 60 * 60 * 24 })
            setCookie('access', data?.access, { secure: true })
            params.callback()
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError?.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// Login-google
export const webLoginGoogle = createAsyncThunk<any, AuthData, { state: RootState }>('auth/web/login/google', async (params, { getState }) => {
    try {
        const response = await axios.post("auth/web/login/google", params.data, config);
        const { data, status } = response;
        console.log(data, "response :", params?.data)
        if (status == 200) {
            toast.dark("Sign in with Google successfully!")
            setCookie('accessToken', data?.accessToken, { maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', data?.refreshToken, { maxAge: 60 * 60 * 24 })
            setCookie('access', data?.access)
            params.callback()
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// Register
export const webRegister = createAsyncThunk<any, AuthData, { state: RootState }>('auth/web/register', async (params, { getState }) => {
    try {
        const response = await axios.post("auth/web/register", params.data, config);
        const { data, status } = response;
        if (status == 201) {
            toast.dark("Sign up successfully!")
            params.callback()
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// Auth me
export const getAuthMe = createAsyncThunk<any, MyData, { state: RootState }>('auth/web/me', async (params, { getState }) => {
    let config: HeadersConfiguration = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${params.token}`
        },
    };
    try {
        const response = await axios.get("auth/web/me", config);
        const { data, status } = response;
        if (status == 200) {
            return data.user
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            if (status == 401) {
                deleteCookie("access")
                deleteCookie("accessToken")
                deleteCookie("refreshToken")
                params.callback()
            }
            throw new Error(newError.message);
        }
    }
});

// logout
export const webLogout = createAsyncThunk<any, AuthData, { state: RootState }>('auth/web/logout', async (params, { getState }) => {
    let config: HeadersConfiguration = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${params.data.token}`
        },
    };
    try {
        const response = await axios.get("auth/web/logout", config);
        const { data, status } = response;
        if (status == 200) {
            toast.dark("Sign out successfully!")
            deleteCookie("access")
            deleteCookie("accessId")
            deleteCookie("accessToken")
            deleteCookie("refreshToken")
            params.callback()
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// Verification
export const webVerification = createAsyncThunk<any, AuthData, { state: RootState }>('auth/web/register/[code]', async (params, { getState }) => {
    let emptyData = {
        data: {}
    }
    try {
        const response = await axios.patch(`auth/web/register/${params.data}`, emptyData.data, config);
        const { data, status } = response;
        if (status == 200) {
            toast.dark("Email has been resend!")
            params.callback()
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError?.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// resend e-mail
export const webResendEmail = createAsyncThunk<any, AuthData, { state: RootState }>('auth/web/register/resendEmail', async (params, { getState }) => {
    let config: HeadersConfiguration = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${params.data.token}`
        },
    };

    let newData = {
        data: {}
    }
    try {
        const response = await axios.post(`auth/web/register/resendEmail`, newData, config);
        const { data, status } = response;
        if (status == 200) {
            toast.dark("Email has been resend!")
            params.callback()
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError?.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// forgot-password
export const webForgotPassword = createAsyncThunk<any, any, { state: RootState }>('auth/web/forgot-password', async (params, { getState }) => {
    try {
        const response = await axios.post("auth/web/forgotPassword", params.data, config);
        const { data, status } = response;
        if (status == 200) {
            toast.dark("Your password has reset! Please, check your Email")
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError?.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// set new password - forgot password
export const webNewPassword = createAsyncThunk<any, any, { state: RootState }>('auth/web/forgot-password/code', async (params, { getState }) => {
    console.log(params, 'params')
    try {
        const response = await axios.patch(`auth/web/forgotPassword/${params.code}`, params.data, config);
        const { data, status } = response;
        if (status == 200) {
            toast.dark("Your password has reset!")
            params.callback()
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError?.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// employee-access
export const webPropertyAccess = createAsyncThunk<any, AccessData, { state: RootState }>('auth/web/access/property/{id}', async (params, { getState }) => {
    let config: HeadersConfiguration = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${params.token}`
        },
    };
    let newData = {};
    try {
        const response = await axios.get(`auth/web/access/property/${params.id}`, config);
        const { data, status } = response;
        if (status == 200) {
            setCookie('accessToken', data?.accessToken, { secure: true, maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', data?.refreshToken, { secure: true, maxAge: 60 * 60 * 24 })
            setCookie('access', "employee", { secure: true })
            setCookie('accessId', params.id, { secure: true })
            newData = {
                ...data,
                access: "property",
                accessId: params.id
            }
            params.callback()
            return newData
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError.message)
        if (error.response && error.response.status === 404) {
            throw new Error('Property not found');
        } else {
            // if (status == 401) {
            //     deleteCookie("access")
            //     deleteCookie("accessId")
            //     deleteCookie("accessToken")
            //     deleteCookie("refreshToken")
            //     params.callback()
            // }
            throw new Error(newError.message);
        }
    }
});

// owner-access
export const webDomainAccess = createAsyncThunk<any, AccessData, { state: RootState }>('auth/web/access/domain/{id}', async (params, { getState }) => {
    let config: HeadersConfiguration = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${params.token}`
        },
    };
    let newData = {};
    try {
        const response = await axios.get(`auth/web/access/domain/${params.id}`, config);
        const { data, status } = response;
        if (status == 200) {
            setCookie('accessToken', data?.accessToken, { secure: true, maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', data?.refreshToken, { secure: true, maxAge: 60 * 60 * 24 })
            setCookie('access', "owner", { secure: true })
            setCookie('accessId', params.id, { secure: true })
            newData = {
                ...data,
                access: "property",
                accessId: params.id
            }
            params.callback()
            return newData
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError.message)
        if (error.response && error.response.status === 404) {
            throw new Error('Property not found');
        } else {
            // if (status == 401) {
            //     deleteCookie("access")
            //     deleteCookie("accessId")
            //     deleteCookie("accessToken")
            //     deleteCookie("refreshToken")
            //     params.callback()
            // }
            throw new Error(newError.message);
        }
    }
});


// SLICER
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // leave this empty here
        resetAuth(state) {
            state.data.user = {}
            state.data.access = ""
            state.data.accessToken = ""
            state.data.refreshToken = ""
            state.isLogin = false
            state.pending = false
            state.error = false
            state.message = ""
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            // login
            .addCase(webLogin.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webLogin.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        access: payload.access,
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken
                    }
                }
            })
            .addCase(webLogin.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // login google
            .addCase(webLoginGoogle.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webLoginGoogle.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        access: payload.access,
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken
                    }
                }
            })
            .addCase(webLoginGoogle.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // register
            .addCase(webRegister.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webRegister.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: false,
                    pending: false,
                    error: false
                }
            })
            .addCase(webRegister.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // verification
            .addCase(webVerification.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webVerification.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: false,
                    pending: false,
                    error: false
                }
            })
            .addCase(webVerification.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // verification
            .addCase(webResendEmail.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webResendEmail.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: false,
                    pending: false,
                    error: false
                }
            })
            .addCase(webResendEmail.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // logout
            .addCase(webLogout.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webLogout.fulfilled, (state, { payload }) => {
                state.isLogin = false;
                state.pending = false;
                state.error = false;
                state.data.user = {}
                state.data.access = ""
                state.data.accessToken = ""
                state.data.refreshToken = ""
            })
            .addCase(webLogout.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // auth-me
            .addCase(getAuthMe.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(getAuthMe.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        user: payload
                    }
                }
            })
            .addCase(getAuthMe.rejected, (state, { error }) => {
                state.pending = false;
                state.error = true;
                state.message = error.message;
            })

            // forgot-password
            .addCase(webForgotPassword.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webForgotPassword.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: false,
                    pending: false,
                    error: false
                }
            })
            .addCase(webForgotPassword.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // change-new-password
            .addCase(webNewPassword.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webNewPassword.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: false,
                    pending: false,
                    error: false
                }
            })
            .addCase(webNewPassword.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // property-access
            .addCase(webPropertyAccess.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webPropertyAccess.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        access: payload.access,
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken
                    }
                }
            })
            .addCase(webPropertyAccess.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            // domain-access
            .addCase(webDomainAccess.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(webDomainAccess.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        access: payload.access,
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken
                    }
                }
            })
            .addCase(webDomainAccess.rejected, (state, { error }) => {
                return {
                    ...state,
                    pending: false,
                    error: true,
                    message: error.message
                }
            })

            .addMatcher(isRejectedAction, (state, action) => { })
            .addDefaultCase((state, action) => {
                let base = {
                    ...state,
                    ...action.state
                }
                return base
            })
    }
});
// SLICER

const authReducers = authSlice.reducer;

export const selectAuth = (state: RootState) => state.authentication;
export const { resetAuth } = authSlice.actions

export default authReducers;