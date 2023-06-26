import React, { SetStateAction, useEffect, useMemo, useState, FC, Fragment } from 'react';
import AuthLayout from '../../components/Layouts/AuthLayouts';
import SignIn from '../../components/Forms/authentication/SignIn';
import SignUp from '../../components/Forms/authentication/SignUp';
import { useRouter } from 'next/router';
import { MdArrowBack } from 'react-icons/md';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useAppDispatch, useAppSelector } from '../../redux/Hook';
import { getCookies } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';
import { getAuthMe, resetAuth, selectAuth } from '../../redux/features/auth/authReducers';
import Modal from '../../components/Modal';
import { FaCircleNotch } from 'react-icons/fa';
import Button from '../../components/Button/Button';
import Link from 'next/link';
import { ModalFooter, ModalHeader } from '../../components/Modal/ModalComponent';
import LoadingPage from '../../components/LoadingPage';
import axios from 'axios';

interface PageProps {
    page?: string;
    token: any;
    firebaseToken: any;
    id: number;
    title: string;
    content: string;
}

type Props = {
    pageProps: PageProps
}

const Authentication: NextPage<Props> = ({ pageProps }) => {
    const router = useRouter();
    const { pathname, query, asPath } = router;
    const { page, token, firebaseToken } = pageProps;

    // auth me
    const dispatch = useAppDispatch();
    const { data, isLogin, error, pending, message } = useAppSelector(selectAuth);

    // state
    const [tabs, setTabs] = useState<string | string[] | undefined>("");
    const [isNotif, setIsNotif] = useState(false);

    const [form, setForm] = useState<any | undefined>({})

    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    type changePageProps = {
        page?: string
        callback: () => void
    }

    const handleChangePage = ({ page, callback }: changePageProps) => {
        setTabs(page)
        callback()
    };

    useEffect(() => {
        if (query?.page) setTabs(query?.page)
    }, [query]);

    useEffect(() => {
        let qr: any = {
            page: query?.page
        };

        if (tabs) qr = { ...qr, page: tabs }
        router.push({ pathname, query: qr }, undefined, { shallow: true });
    }, [tabs]);

    console.log(router, 'data query')

    useEffect(() => {
        setIsSignUp(tabs === "sign-up" ? true : false)
        setIsSignIn(tabs === "sign-in" ? true : false)
    }, [tabs])

    useEffect(() => {
        let notif = (message === "Email Not Registered!");
        if (error && notif) {
            setIsNotif(true)
        } else {
            setIsNotif(false)
            setForm({})
        }
    }, [error, message])

    return (
        <AuthLayout
            title="Authentication"
            logo="../image/logo/logo-icon.svg"
            description=""
        >
            <LoadingPage loading={pending} />
            <div className='relative overflow-hidden w-full h-full flex items-center rounded-xl bg-white shadow-default p-10'>
                <SignIn firebaseToken={firebaseToken} onChangePage={handleChangePage} isOpen={isSignIn} value={form} setValue={setForm} />

                <div className={`relative hidden w-full lg:w-1/2 h-full lg:inline-block transition-transform duration-300 ease-in-out border bg-primary text-white border-stroke rounded-3xl ${tabs === "sign-in" ? "translate-x-full" : ""}`}>
                    <div className="w-full h-full flex flex-col items-center justify-between">
                        <Link className={`w-full pt-5.5 flex items-center gap-4 px-10 ${tabs === "sign-up" ? "" : "hidden"}`} href='/'>
                            <img src="../image/logo/logo-icon-white.png" alt="logo" />
                            <h2 className='text-lg text-white sm:text-title-lg'>
                                Colony.
                            </h2>
                        </Link>
                        <div className={`w-full flex flex-col px-10 justify-center ${tabs === "sign-up" ? "" : "h-full"}`}>
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

                    <div className={`absolute z-40 inset-y-1/2 ${tabs === "sign-up" ? "" : "right-0"}`}>
                        <Tooltip
                            className={`tooltip w-full text-sm bg-[#111F2C3D] p-2 rounded-lg focus:outline-none ${tabs === "sign-up" ? "rounded-tl-none rounded-bl-none" : "rounded-tr-none rounded-br-none"}`}
                            classTooltip='p-5 rounded-xl shadow-lg z-1 font-bold w-full min-w-max'
                            tooltip={tabs === "sign-up" ? "Go to Sign in" : "Go to Sign up"}
                            color='light'
                            position={tabs === "sign-up" ? "right" : "left"}
                        >
                            <MdArrowBack onClick={() => handleChangePage({ page: tabs === "sign-up" ? "sign-in" : "sign-up", callback: () => setForm({}) })} className={`w-10 h-10 transition-transform ease-in-out duration-1000 ${tabs === "sign-up" ? "rotate-180" : ""}`} />
                        </Tooltip>
                    </div>
                </div>

                {/* sign up */}
                <SignUp onChangePage={handleChangePage} isOpen={isSignUp} value={form} setValue={setForm} />
            </div>

            <Modal
                isOpen={isNotif}
                onClose={() => setIsNotif(false)}
                size='small'
            >
                <Fragment>
                    <ModalHeader
                        className='p-6 border-b-2 border-gray'
                        isClose
                        onClick={() => {
                            setIsNotif(false)
                            dispatch(resetAuth())
                        }}
                    >
                        <div className="w-full flex-col items-start text-graydark">
                            <h3 className='text-[22px] font-bold'>Do you want to register ?</h3>
                            <p className='text-sm text-gray-5'>this email hasn’t been registered in our system</p>
                        </div>
                    </ModalHeader>
                    <ModalFooter
                        className='px-8 py-4'
                    >
                        <div className='w-full flex items-center gap-2 justify-end'>
                            <Button
                                variant="secondary-outline"
                                className="rounded-lg px-4 border-gray-4 shadow-lg text-sm"
                                type="button"
                                onClick={() => {
                                    setIsNotif(false)
                                    dispatch(resetAuth())
                                }}
                            >Discard</Button>
                            <Button
                                className="rounded-lg px-4 text-sm shadow-lg"
                                variant="primary"
                                type="button"
                                onClick={() => {
                                    router.push("/authentication?page=sign-up")
                                    setIsNotif(false)
                                    dispatch(resetAuth())
                                }}
                            >
                                {pending ? <Fragment>
                                    <FaCircleNotch className='w-5 h-5 animate-spin-2' />
                                    Loading ....
                                </Fragment> : "Save"}
                            </Button>
                        </div>
                    </ModalFooter>
                </Fragment>
            </Modal>
        </AuthLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const cookies = getCookies({ req, res })
    const token = cookies['accessToken'] || null;
    const firebaseToken = cookies['firebaseToken'] || null;

    if (token) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            },
        }
    }

    return {
        props: { token, firebaseToken, page: query },
    };
};

export default Authentication;
