
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
import CatalogPage from '../pages/catalog.jsx';
import ProductPage from '../pages/product.jsx';
import SettingsPage from '../pages/settings.jsx';
import DescriptionPage from '../pages/description.jsx';
import TermsAndConditions from '../pages/tnc.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';
import MessagesPage from '../pages/messages.jsx';
import ReachUs from '../pages/contact.jsx';
import Credits from '../pages/credit.jsx';

var routes = [
  {
    path: '/',
    component: MessagesPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/x/',
    component: () => {
      window.location.href = "https://twitter.com/MadhuryaCodes";
      return null; // or an empty component
    },
  },
  {
    path: '/github/',
    component: () => {
      window.location.href = "https://github.com/MADHURYAHAIT";
      return null; // or an empty component
    },
  },
  {
    path: '/ig/',
    component: () => {
      window.location.href = "https://www.instagram.com/madhuryahait/";
      return null; // or an empty component
    },
  },
  {
    path: '/li/',
    component: () => {
      window.location.href = "https://www.linkedin.com/in/madhuryahait/";
      return null; // or an empty component
    },
  },
  {
    path: '/tnc/',
    component: TermsAndConditions,
  },
  {
    path: '/contact/',
    component: ReachUs,
  },
  {
    path: '/credit/',
    component: Credits,
  },
  {
    path: '/description/',
    component: DescriptionPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/message/',
    component: MessagesPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
