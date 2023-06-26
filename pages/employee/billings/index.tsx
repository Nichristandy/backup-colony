import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayouts'
import SidebarBM from '../../../components/Layouts/Sidebar/Building-Management';
import { MdAdd, MdArrowDropUp, MdArrowRightAlt, MdCleaningServices, MdEdit, MdLocalHotel, MdMonetizationOn } from 'react-icons/md';
import Button from '../../../components/Button/Button';
import Cards from '../../../components/Cards/Cards';
import Barcharts from '../../../components/Chart/Barcharts';
import Doughnutcharts from '../../../components/Chart/Doughnutcharts';
import { getCookies } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook';
import { getAuthMe, selectAuth } from '../../../redux/features/auth/authReducers';
import { useRouter } from 'next/router';
import SidebarComponent from '../../../components/Layouts/Sidebar/SidebarComponent';
import { menuBM, menuPayments } from '../../../utils/routes';

type Props = {
  pageProps: any
}

const Dashboard = ({ pageProps }: Props) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { token, access, firebaseToken } = pageProps;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // redux
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectAuth);

  // state
  const [doghnutData, setDoghnutData] = useState([]);
  const [doghnutLabel, setDoghnutLabel] = useState([]);

  let doughnutData = {
    labels: ['Guest', 'Available', 'Tenants'],
    datasets: [
      {
        label: '# Votes',
        data: [20, 100, 500],
        backgroundColor: [
          '#44C2FD',
          '#FAEE81',
          '#5F59F7',
        ],
        borderColor: [
          '#44C2FD',
          '#FAEE81',
          '#5F59F7',
        ],
        borderWidth: 1,
      },
    ]
  };

  let bardata = {
    labels: ["B1", "B2", "G"],
    datasets: [
      {
        label: "Single",
        borderRadius: 0,
        data: [100, 250, 50],
        backgroundColor: "#5F59F7",
        barThickness: 20,
      },
      {
        label: "Tandem",
        borderRadius: 0,
        data: [100, 90, 50],
        backgroundColor: "#FF8859",
        barThickness: 20,
      },
      {
        label: "Guest",
        borderRadius: 0,
        data: [100, 10, 50],
        backgroundColor: "#44C2FD",
        barThickness: 20,
      },
    ],
  };

  let bardataMonths = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Months",
        borderRadius: 0,
        data: [100, 250, 50, 30, 15, 3, 90, 200, 145, 32, 55, 89],
        backgroundColor: "#5F59F7",
        barThickness: 20,
      }
    ],
  };

  let bardataHour = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    datasets: [
      {
        label: "In",
        borderRadius: 0,
        data: [100, 250, 50, 30, 15, 3, 90],
        backgroundColor: "#5F59F7",
        barThickness: 20,
      },
      {
        label: "Out",
        borderRadius: 0,
        data: [100, 90, 50, 69, 8, 78, 44],
        backgroundColor: "#FF8859",
        barThickness: 20,
      },
    ],
  };

  let doughnutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        responsive: true,
        display: true,
        position: "right",
        align: "center",
        labels: {
          boxWidth: 20,
          font: {
            size: 16,
          },
          generateLabels: (chart: any) => {
            const { labels, datasets } = chart.data;
            if (labels.length > 0) {
              return labels.map((label: any, i: any) => {
                const { borderColor, backgroundColor, data } = datasets[0];
                const total = data.reduce((a: number, b: number) => a + b, 0);

                const formattedLabel = data.map((val: number, i: any) => {
                  let currentValue = val;
                  let percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                  return {
                    value: currentValue,
                    label,
                    percentage,
                    backgroundColor: backgroundColor[i],
                    borderColor: borderColor[i]
                  };
                });

                return {
                  text: `${formattedLabel[i].label} - ${formattedLabel[i].percentage}%`,
                  fillStyle: formattedLabel[i].backgroundColor,
                  hidden: !chart.getDataVisibility(i),
                  index: i,
                };
              });
            }
            return [];
          }
        },
      },
      parsing: {
        key: 'id'
      },
      title: {
        display: true,
        position: "top",
        align: "start",
        text: 'Parking Lots',
        font: {
          size: 16,
          weight: 300
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      tooltip: {
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 16
        },
        callbacks: {
          label: function (item: any) {
            let dataset = item.dataset;
            const total = dataset.data.reduce(function (sum: number, current: any) { return sum + Number(current) }, 0)
            let currentValue = item.parsed;
            let percentage = Math.floor(((currentValue / total) * 100) + 0.5);
            return `${item.label} : ${currentValue} ${currentValue > 1 ? "lots" : "lot"} - ${percentage}%`
          }
        }
      },
    }
  };

  let barOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 16
        }
      },
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          boxWidth: 15,
          usePointStyle: false,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        position: "top",
        align: "start",
        text: 'Total Lots by Type 2022',
        font: {
          size: 16,
          weight: 300
        },
      },
    },
    elements: {
      bar: {
        percentage: 0.1,
        categoryPercentage: 0,
      },
    },
  };

  let barOptionsMonths = {
    responsive: true,
    plugins: {
      tooltip: {
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 16
        }
      },
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          boxWidth: 15,
          usePointStyle: false,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        position: "top",
        align: "start",
        text: 'Incoming Guest/Month 2022',
        font: {
          size: 16,
          weight: 300
        },
      },
    },
    elements: {
      bar: {
        percentage: 0.1,
        categoryPercentage: 0,
      },
    },
  };

  let barOptionsHour = {
    responsive: true,
    plugins: {
      tooltip: {
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 16
        }
      },
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          boxWidth: 15,
          usePointStyle: false,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        position: "top",
        align: "start",
        text: 'Peak Hour on July 2022',
        font: {
          size: 16,
          weight: 300
        },
      },
    },
    elements: {
      bar: {
        percentage: 0.1,
        categoryPercentage: 0,
      },
    },
  };

  useEffect(() => {
    if (token) {
      dispatch(getAuthMe({ token, callback: () => router.push("/authentication?page=sign-in") }))
    }
  }, [token]);

  return (
    <DefaultLayout
      title="Colony"
      header="Billings & Payments"
      head="Dashboard"
      logo="../image/logo/logo-icon.svg"
      description=""
      images="../image/logo/building-logo.svg"
      userDefault="../image/user/user-01.png"
      token={token}
      icons={{
        icon: MdMonetizationOn,
        className: "w-8 h-8 text-meta-3"
      }}
    >
      <div className='absolute inset-0 mt-20 z-99 bg-boxdark flex text-white'>
        <SidebarComponent
          className=''
          menus={menuPayments}
          sidebar={sidebarOpen}
          setSidebar={setSidebarOpen}
        />

        <div className="relative w-full bg-white lg:rounded-tl-[3rem] overflow-y-auto">
          <div className='sticky bg-white top-0 z-50 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between py-6 px-8 2xl:px-10 gap-2'>
            <div className='w-full flex items-center justify-between py-3'>
              <button
                aria-controls='sidebar'
                aria-expanded={sidebarOpen}
                onClick={(e) => {
                  e.stopPropagation()
                  setSidebarOpen(!sidebarOpen)
                }}
                className='rounded-sm border p-1.5 shadow-sm border-strokedark bg-boxdark lg:hidden'
              >
                <MdArrowRightAlt className={`w-5 h-5 delay-700 ease-in-out ${sidebarOpen ? "rotate-180" : ""}`} />
              </button>
              <h3 className='w-full lg:max-w-max text-center text-2xl font-semibold text-graydark'>Dashboard</h3>
            </div>
          </div>

          <main className='w-full relative tracking-wide text-left text-boxdark-2 py-6 px-8 2xl:px-10 bg-gray'>
            <div className="w-full flex flex-1 flex-col overflow-auto gap-2.5 lg:gap-6">
              {/* content */}
              <div className="w-full grid col-span-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 tracking-wider mb-5">
                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray'>
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h1>Occupancy Level</h1>
                    <div className='w-full flex items-center gap-2'>
                      <span className='w-full max-w-max font-semibold'>87%</span>
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-[#EFEAD8] shadow-card w-full my-auto">
                          <div style={{ width: "70%" }} className="shadow-none z-10 flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary hover:opacity-50 font-semibold text-[.5rem]">70%</div>
                          <div style={{ width: "17%" }} className="shadow-none z-10 flex flex-col text-center whitespace-nowrap text-white justify-center bg-warning hover:opacity-50 font-semibold text-[.5rem]">17%</div>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center text-xs tracking-normal justify-between'>
                      <p>322 Occupied</p>
                      <p>400 Owned</p>
                      <p>500 Units</p>
                    </div>
                  </div>
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray'>
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h1>Total Owner</h1>
                    <div className='w-full flex items-center gap-2'>
                      <span className='w-full lg:w-2/12 font-semibold'>522</span>
                      <div className="w-full lg:w-10/12 flex items-center justify-between gap-2">
                        <div className="w-full max-w-max flex items-center gap-2 text-primary font-semibold text-sm">
                          <MdArrowDropUp className='w-4 h-4' />
                          <p>5 new tenants</p>
                        </div>
                        <Button
                          className="px-0 py-0"
                          type="button"
                          onClick={() => console.log("edit")}
                          variant="primary-outline-none"
                        >
                          <MdEdit className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-between text-xs tracking-normal'>
                      <div className="w-full max-w-max flex items-center gap-2">
                        <MdArrowDropUp className='w-4 h-4' />
                        <p>5 new tenants</p>
                      </div>
                      <p>123 m2</p>
                    </div>
                  </div>
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray'>
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h1>Total Tenant</h1>
                    <div className='w-full flex items-center justify-between gap-2'>
                      <span className='w-full lg:w-2/12 font-semibold'>87%</span>
                      <Button
                        className="px-0 py-0"
                        type="button"
                        onClick={() => console.log("edit")}
                        variant="primary-outline-none ml-auto"
                      >
                        <MdEdit className='w-4 h-4' />
                      </Button>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-between text-xs tracking-normal'>
                      <div className="w-full max-w-max flex items-center gap-2">
                        <MdArrowDropUp className='w-4 h-4' />
                        <p>5 new tenants</p>
                      </div>
                      <p>123 m2</p>
                    </div>
                  </div>
                </Cards>
              </div>

              <div className="w-full grid col-span-1 lg:grid-cols-2 gap-4 tracking-wider mb-5">
                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray p-4'>
                  <Doughnutcharts data={doughnutData} options={doughnutOptions} className='w-full max-w-max' height='300px' />
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray p-4'>
                  <Barcharts data={bardata} options={barOptions} className='w-full max-w-max' height='200px' />
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray p-4'>
                  <Barcharts data={bardataMonths} options={barOptionsMonths} className='w-full max-w-max' height='200px' />
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray p-4'>
                  <Barcharts data={bardataHour} options={barOptionsHour} className='w-full max-w-max' height='200px' />
                </Cards>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Parse cookies from the request headers
  const cookies = getCookies(context)

  // Access cookies using the cookie name
  const token = cookies['accessToken'] || null;
  const access = cookies['access'] || null;
  const firebaseToken = cookies['firebaseToken'] || null;

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

export default Dashboard;