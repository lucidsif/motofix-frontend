// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

// Create sitemap using React Router Sitemap
import { getAsyncInjectors } from './utils/asyncInjectors';
// TODO: inject vehicle reducer to quotecentral

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(location, cb) {
        System.import('containers/Landing')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/apollo',
      name: 'apolloTest',
      getComponent(location, cb) {
        System.import('containers/ApolloTest')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
    }, {
      path: '/landing',
      name: 'landing',
      getComponent(location, cb) {
        System.import('containers/Landing')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'loginPage',
      getComponent(location, cb) {
        System.import('containers/LoginPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/quote',
      name: 'quoteContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/QuoteContainer/reducer'),
          System.import('containers/QuoteContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('quoteContainer', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/quote/vehicle',
          name: 'quoteAddVehicle',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/QuoteAddVehicle/reducer'),
              System.import('containers/QuoteAddVehicle'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, component]) => {
              injectReducer('quoteAddVehicle', reducer.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/quote/services',
          name: 'QuoteCentral',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/QuoteCentral/reducer'),
              System.import('containers/QuoteCentral'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, component]) => {
              injectReducer('quoteCentral', reducer.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/quote/schedule',
          name: 'QuoteAppointmentScheduler',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/QuoteAppointmentScheduler/reducer'),
              System.import('containers/QuoteAppointmentScheduler'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, component]) => {
              injectReducer('quoteAppointmentScheduler', reducer.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '/privacy-policy',
      name: 'privacyPolicy',
      getComponent(location, cb) {
        System.import('containers/PrivacyPolicy')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/terms-and-conditions',
      name: 'termsAndConditions',
      getComponent(location, cb) {
        System.import('containers/TermsAndConditions')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'signupPage',
      getComponent(location, cb) {
        System.import('containers/SignupPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/dashboard/quotes',
      name: 'savedQuotes',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SavedQuotes/reducer'),
          System.import('containers/SavedQuotes'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('savedQuotes', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/how-it-works',
      name: 'howItWorks',
      getComponent(location, cb) {
        System.import('containers/HowItWorks')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/faq',
      name: 'faq',
      getComponent(location, cb) {
        System.import('containers/Faq')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/motorcycle-mechanic-jobs',
      name: 'mechanicJobs',
      getComponent(location, cb) {
        System.import('containers/MechanicJobs')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/dashboard',
      name: 'dashboard',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Dashboard/reducer'),
          System.import('containers/Dashboard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('dashboard', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
