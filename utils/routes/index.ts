import { IconType } from "react-icons";
import { MdArchive, MdAssignment, MdCardMembership, MdCreditCard, MdFileCopy, MdHelpOutline, MdLocalParking, MdMonetizationOn, MdMoneyOff, MdMuseum, MdOutlineBusiness, MdOutlineDashboard, MdOutlineFileCopy, MdOutlineInfo, MdOutlineMap, MdOutlineNextWeek, MdOutlinePeopleAlt, MdOutlineSettings, MdPermDeviceInformation, MdPhotoSizeSelectActual, MdReceipt, MdStore, MdUnarchive, MdWarningAmber, MdWork } from "react-icons/md";

export type MenuProps = {
  title?: string;
  pages?: string;
  subMenus?: MenuProps[];
  className?: string;
  pathname?: string;
  url?: string;
  query?: any;
  icons?: {
    icon: IconType,
    className?: string
  };
  routes?: MenuProps[];
};

// master routes
export const menuMaster: MenuProps[] = [
  {
    subMenus: [
      {
        pathname: "Building Management",
        pages: "building-management",
        url: "/employee/building-management",
        icons: {
          icon: MdMuseum,
          className: "w-8 h-8 text-meta-5",
        },
        className: "text-lg"
        // text-[#44C2FD]
      },
      {
        pathname: "Billings & Payments",
        pages: "billings",
        url: "/employee/billings",
        icons: {
          icon: MdMonetizationOn,
          className: "w-8 h-8 text-meta-3"
        },
        className: "text-lg"
        // text-[#44FDAF]
      },
      {
        pathname: "Task Management",
        pages: "tasks",
        url: "/employee/tasks",
        icons: {
          icon: MdWork,
          className: "w-8 h-8 text-meta-7"
        },
        className: "text-lg"
        // text-[#F7597F] 
      },
      {
        pathname: "Assets & Inventories",
        pages: "assets-inventories",
        url: "/employee/assets-inventories",
        icons: {
          icon: MdUnarchive,
          className: "w-8 h-8 text-meta-6"
        },
        className: "text-lg"
        // text-[#F7E759]
      },
      {
        pathname: "Media",
        pages: "media",
        url: "/employee/media/videos",
        icons: {
          icon: MdPhotoSizeSelectActual,
          className: "w-8 h-8 text-primary"
        },
        className: "text-lg"
      },
      {
        pathname: "Merchants",
        pages: "merchants",
        url: "/employee/merchants",
        icons: {
          icon: MdStore,
          className: "w-8 h-8 text-meta-8"
        },
        className: "text-lg"
        // text-[#F79259]
      },
    ]
  },
  {
    subMenus: [
      {
        pathname: "Settings",
        pages: "settings",
        url: "/settings",
        icons: {
          icon: MdOutlineSettings,
          className: "w-8 h-8"
        },
      },
      {
        pathname: "Helps",
        pages: "helps",
        url: "/helps",
        icons: {
          icon: MdHelpOutline,
          className: "w-8 h-8"
        },
      },
    ]
  }
];

// Building Management
export const menuBM: MenuProps[] = [
  {
    pathname: "Dashboard",
    pages: "dashboard",
    url: "/employee/building-management",
    icons: {
      icon: MdOutlineDashboard,
      className: "w-5 h-5"
    }
  },
  {
    pathname: "Occupancy",
    pages: "occupancy",
    url: "/employee/building-management/occupancy",
    query: {
      page: 1,
      limit: 10,
    },
    icons: {
      icon: MdOutlinePeopleAlt,
      className: "w-5 h-5"
    }
  },
  {
    pathname: "Tower Management",
    pages: "towers",
    url: "/employee/building-management/towers",
    query: {
      page: 1,
      limit: 10,
    },
    icons: {
      icon: MdOutlineBusiness,
      className: "w-5 h-5"
    }
  },
  {
    pathname: "Area Grouping",
    url: "/employee/building-management/areas",
    query: {
      page: 1,
      limit: 10,
    },
    icons: {
      icon: MdOutlineMap,
      className: "w-5 h-5"
    }
  },
  {
    subMenus: [
      {
        pathname: "Parkings",
        pages: "parkings",
        url: "",
        icons: {
          icon: MdLocalParking,
          className: "w-5 h-5"
        },
        routes: [
          {
            pathname: "Parking Lot",
            url: "/employee/building-management/parkings/parking-lots",
            query: {
              page: 1,
              limit: 10,
            },
          },
          {
            pathname: "Registered Vehicles",
            url: "/employee/building-management/parkings/vehicles",
            query: {
              page: 1,
              limit: 10,
            },
          },
          {
            pathname: "Vehicle Transaction",
            url: "/employee/building-management/parkings/transactions",
            query: {
              page: 1,
              limit: 10,
            },
          },
        ]
      },
      {
        pathname: "Access Card",
        pages: "access-card",
        url: "",
        icons: {
          icon: MdCardMembership,
          className: "w-5 h-5"
        },
        routes: [
          {
            pathname: "Master Data",
            url: "/employee/building-management/access-card/master-data",
            query: {
              page: 1,
              limit: 10,
            },
          },
          {
            pathname: "History transaction",
            url: "/employee/building-management/access-card/transactions",
            query: {
              page: 1,
              limit: 10,
            },
          },
        ]
      },
    ],
    title: "Additional Features"
  },
];

export const menuParkings: MenuProps[] = [
  {
    pathname: "Parking Lot",
    url: "/employee/building-management/parkings/parking-lots",
    query: {
      page: 1,
      limit: 10,
    },
  },
  {
    pathname: "Registered Vehicle",
    url: "/employee/building-management/parkings/vehicles",
    query: {
      page: 1,
      limit: 10,
    },
  },
  {
    pathname: "Vehicle Transaction",
    url: "/employee/building-management/parkings/transactions",
    query: {
      page: 1,
      limit: 10,
    },
  },
];

export const menuAccessCard: MenuProps[] = [
  {
    pathname: "Master Data",
    url: "/employee/building-management/access-card/master-data",
    query: {
      page: 1,
      limit: 10,
    },
  },
  {
    pathname: "History Transaction",
    url: "/employee/building-management/access-card/transactions",
    query: {
      page: 1,
      limit: 10,
    },
  },
];

// media
export const menuMedia: MenuProps[] = [
  {
    pathname: "Video Media",
    pages: "videos",
    url: "/employee/media/videos",
    query: {
      page: 1,
      limit: 10,
    },
  },
  {
    pathname: "News & Articles",
    pages: "articles",
    url: "/employee/media/articles",
    query: {
      page: 1,
      limit: 10,
    },
  },
];

// task
export const menuTask: MenuProps[] = [
  {
    pathname: "Dashboard",
    pages: "dashboard",
    url: "/employee/tasks",
    icons: {
      icon: MdOutlineDashboard,
      className: "w-5 h-5"
    }
  },
  {
    pathname: "Projects",
    pages: "projects",
    icons: {
      icon: MdOutlinePeopleAlt,
      className: "w-5 h-5"
    },
    routes: [
      {
        pathname: "Table View",
        url: "/employee/tasks/projects/tables",
        query: {
          page: 1,
          limit: 10,
        },
      },
      {
        pathname: "Schedule Board",
        url: "/employee/tasks/projects/calendar-board",
        query: {
          page: 1,
          limit: 10,
        },
      },
    ]
  },
  {
    pathname: "Issues",
    pages: "issues",
    url: "/employee/tasks/issues",
    query: {
      page: 1,
      limit: 10,
    },
    icons: {
      icon: MdOutlineBusiness,
      className: "w-5 h-5"
    }
  },
  {
    subMenus: [
      {
        pathname: "Project Type",
        url: "/employee/tasks/settings/project-type",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdOutlineNextWeek,
          className: "w-5 h-5"
        }
      },
      {
        pathname: "Team Members",
        url: "/employee/tasks/settings/team-members",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdOutlinePeopleAlt,
          className: "w-5 h-5"
        }
      },
      {
        pathname: "Task Category",
        url: "/employee/tasks/settings/task-category",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdAssignment,
          className: "w-5 h-5"
        }
      },
      {
        pathname: "Issue Category",
        url: "/employee/tasks/settings/issue-category",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdWarningAmber,
          className: "w-5 h-5"
        }
      },
      {
        pathname: "Issue Type",
        url: "/employee/tasks/settings/issue-type",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdOutlineInfo,
          className: "w-5 h-5"
        }
      },
    ],
    title: "Settings"
  },
];

export const menuProjects: MenuProps[] = [
  {
    pathname: "Table View",
    url: "/employee/tasks/projects/tables",
    query: {
      page: 1,
      limit: 10,
    },
  },
  {
    pathname: "Schedule Board",
    url: "/employee/tasks/projects/calendar-board",
    query: {
      page: 1,
      limit: 10,
    },
  }
];

// billing payment
export const menuPayments: MenuProps[] = [
  {
    pathname: "Dashboard",
    pages: "dashboard",
    url: "/employee/billings",
    icons: {
      icon: MdOutlineDashboard,
      className: "w-5 h-5"
    }
  },
  {
    pathname: "Payments",
    pages: "payments",
    url: "/employee/billings/payments",
    query: {
      page: 1,
      limit: 10,
    },
    icons: {
      icon: MdCreditCard,
      className: "w-5 h-5"
    }
  },
  {
    pathname: "Invoices",
    pages: "invoices",
    url: "/employee/billings/invoices",
    query: {
      page: 1,
      limit: 10,
    },
    icons: {
      icon: MdReceipt,
      className: "w-5 h-5"
    }
  },
  {
    pathname: "Receipt",
    pages: "receipt",
    url: "/employee/billings/receipt",
    query: {
      page: 1,
      limit: 10,
    },
    icons: {
      icon: MdArchive,
      className: "w-5 h-5"
    }
  },
  // {
  //   pathname: "Payments",
  //   pages: "payments",
  //   icons: {
  //     icon: MdOutlinePeopleAlt,
  //     className: "w-5 h-5"
  //   },
  //   routes: [
  //     {
  //       pathname: "Table View",
  //       url: "/employee/tasks/projects/tables",
  //       query: {
  //         page: 1,
  //         limit: 10,
  //       },
  //     },
  //     {
  //       pathname: "Schedule Board",
  //       url: "/employee/tasks/projects/calendar-board",
  //       query: {
  //         page: 1,
  //         limit: 10,
  //       },
  //     },
  //   ]
  // },
  {
    subMenus: [
      {
        pathname: "Templates",
        url: "/employee/billings/settings/templates",
        pages: "templates",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdOutlineFileCopy,
          className: "w-5 h-5"
        }
      },
      {
        pathname: "Taxes",
        url: "/employee/billings/settings/taxes",
        pages: "taxes",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdMoneyOff,
          className: "w-5 h-5"
        }
      },
      {
        pathname: "Discounts",
        url: "/employee/billings/settings/discounts",
        pages: "discounts",
        query: {
          page: 1,
          limit: 10,
        },
        icons: {
          icon: MdPermDeviceInformation,
          className: "w-5 h-5"
        }
      }
    ],
    title: "Settings"
  },
];

export const menuTenant : MenuProps[] =[
  {
    pathname:"billing history"
  },
  {
    pathname:"transaction history"
  }
]