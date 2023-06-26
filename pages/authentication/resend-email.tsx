import React, { ChangeEvent, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayouts'
import Button from '../../components/Button/Button'
import Link from 'next/link'
import { MdArrowBack, MdCheckCircleOutline, MdLockOutline, MdOutlineContactMail, MdOutlineEmail, MdOutlineMail } from 'react-icons/md'
import { useRouter } from 'next/router'
import AccountVerify from '../../components/Forms/authentication/AccountVerify'
import AccountVerified from '../../components/Forms/authentication/AccountVerified'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { getAuthMe, selectAuth, webResendEmail, webVerification } from '../../redux/features/auth/authReducers'
import { GetServerSideProps } from 'next'
import { getCookies } from 'cookies-next'
import Modal from '../../components/Modal'
import { ModalFooter, ModalHeader } from '../../components/Modal/ModalComponent'
import { FaCheckCircle, FaCircleNotch, FaEnvelope } from 'react-icons/fa'
import LoadingPage from '../../components/LoadingPage'
import ResendYourEmail from '../../components/Forms/authentication/ResendEmail'
import ResendEmailSuccess from '../../components/Forms/authentication/ResendEmailSuccess'

type Props = {
    pageProps: any
}

type changePageProps = {
    callback?: () => void
}

const ResendEmail = ({ pageProps }: Props) => {
    const router = useRouter();
    const { pathname, query } = router;
    const { token, access, firebaseToken } = pageProps;
    const [tabs, setTabs] = useState<string | string[]>("");
    const [code, setCode] = useState<string | string[]>("");
    const [email, setEmail] = useState<string | string[]>("");

    // redux
    const dispatch = useAppDispatch();
    const { data, error, message, pending } = useAppSelector(selectAuth);

    // resend-email
    const [isResendEmail, setIsResendEmail] = useState(false);
    const [isResendEmailSuccess, setIsResendEmailSuccess] = useState(false);

    // query
    useEffect(() => {
        if (query?.page) setTabs(query?.page)
        if (query?.code) setCode(query?.code)
    }, [query]);

    // set state query
    useEffect(() => {
        let qr = {
            page: tabs || query?.page,
            code: code || query?.code,
        };
        if (!tabs || !code) return;
        router.replace({ pathname, query: qr });
    }, [tabs, code]);

    const resend = useMemo(() => {
        let res;
        res = (tabs === "resend") ? true : false
        return res
    }, [tabs])

    const resendSuccess = useMemo(() => {
        let res;
        res = (tabs === "success") ? true : false
        return res
    }, [tabs]);

    useEffect(() => {
        if (token) {
            dispatch(getAuthMe({
                token, callback: () => router.push({
                    pathname: "/authentication",
                    query: {
                        page: "sign-in"
                    }
                })
            }))
        }
    }, [token]);

    useEffect(() => {
        let emailUser = data?.user?.email;
        if (emailUser) {
            setEmail(emailUser)
        }
    }, [data?.user?.email])

    const isOpenResendEmail = () => {
        setIsResendEmail(true)
    }

    const onResendEmail = () => {
        dispatch(webResendEmail({
            data: {
                token,
                email
            },
            callback: () => {
                setIsResendEmail(false)
                setIsResendEmailSuccess(true)
            }
        }))
    }

    return (
        <AuthLayout
            title="Resen Email"
            logo="../image/logo/logo-icon.svg"
            description=""
        >
            <LoadingPage loading={pending} />

            <div className='relative w-full h-full flex items-center rounded-xl bg-white shadow-default p-10'>
                <ResendYourEmail
                    isOpen={resend}
                    isOpenResendEmail={isOpenResendEmail}
                />

                <ResendEmailSuccess isOpen={resendSuccess} />

                <div className={`hidden w-full lg:w-1/2 h-full lg:block transition-transform duration-500 border bg-primary text-white border-stroke rounded-3xl ease-in-out`}>
                    <div className="w-full h-full flex flex-col items-center justify-between">
                        <Link className='w-full pt-5.5 flex items-center gap-4 px-10' href='/authentication?page=sign-in'>
                            <img src="../image/logo/logo-icon-white.png" alt="logo" />
                            <h2 className='text-lg text-white sm:text-title-lg'>
                                Colony.
                            </h2>
                        </Link>
                        <div className='w-full flex flex-col px-10 justify-center'>
                            <div className='flex flex-col justify-center'>
                                <h2 className='text-title-md2 lg:text-title-lg mb-5'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </h2>

                                <p className='leading-1 text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, minus cumque molestias voluptatibus veniam minima soluta accusamus aspernatur praesentium maiores?</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-end py-10 px-10 tracking-wider'>
                            <div className='w-full p-6 rounded-lg bg-[#111f2c3d] text-sm'>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In tempore debitis beatae doloremque eveniet eos sunt repellendus accusantium ab distinctio.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isResendEmail}
                onClose={() => setIsResendEmail(false)}
                size='small'
            >
                <Fragment>
                    <ModalHeader
                        className='w-full p-6 font-bold border-b-2 border-gray'
                        isClose
                        onClick={() => setIsResendEmail(false)}
                    >
                        <div>

                            <div className='flex items-center gap-2'>
                                <h3 className='text-graydark text-sm lg:text-title-sm'>Resend e-mail</h3>
                                <FaCircleNotch className={`w-6 h-6 text-primary animate-spin-2 ${!pending ? "hidden" : ""}`} />
                                <FaCheckCircle className={`w-6 h-6 text-primary ${!isResendEmailSuccess ? "hidden" : ""}`} />
                                <FaEnvelope className={`w-6 h-6 text-primary ${isResendEmailSuccess || pending ? "hidden" : ""}`} />
                            </div>
                            <p className={`text-gray-5 ${!isResendEmailSuccess ? "hidden" : ""}`}>Your Email has been resend!</p>
                        </div>

                    </ModalHeader>
                    <ModalFooter
                        isClose
                        onClick={() => setIsResendEmail(false)}
                        className='justify-end p-8'
                    >
                        <Button
                            type="button"
                            onClick={onResendEmail}
                            className="rounded-lg focus:outline-none py-2 px-4 text-sm"
                            variant="primary"
                            disabled={pending}
                        >
                            <span>Resend e-mail</span>
                            <MdOutlineMail className='w-5 h-5' />
                        </Button>
                    </ModalFooter>
                </Fragment>
            </Modal>
        </AuthLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Parse cookies from the request headers
    const cookies = getCookies(context)

    // Access cookies using the cookie name
    const token = cookies['accessToken'] || null;
    const access = cookies['access'] || null;
    const firebaseToken = cookies['firebaseToken'] || null;

    if (token && access !== "resendEmail") {
        return {
          redirect: {
            destination: "/", // Redirect to the home page
            permanent: false,
          },
        };
      }

    if (!token) {
        return {
          redirect: {
            destination: "/authentication?page=sign-in", // Redirect to the home page
            permanent: false
          },
        };
      }

    return {
        props: { token, access, firebaseToken },
    };
};

export default ResendEmail