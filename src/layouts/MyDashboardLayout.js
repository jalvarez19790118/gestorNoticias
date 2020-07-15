import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Header, Footer, PageContent, Page } from '../created';
import routes from '../routes';
import Logo from '../assets/images/logo.png';
import ContextProviders from '../created/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../created/helpers/handleTabAccessibility';
import MyProvider from '../context/MyContext';
import FormProvider from '../context/FormContext';
import GAppProvider from '../context/GAppContext';

import PrivateRoute from './PrivateRoute';

const MOBILE_SIZE = 992;

export default class MyDashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE,
    };
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState((prevState) => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  redirectToInitialRoute() {
    this.customHistory.push('/gestor/n/noticias');
  }

  render() {
    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <GAppProvider>
        <MyProvider>
          <FormProvider>
            <ContextProviders>
              <div className={`app ${sidebarCollapsedClass}`}>
                <div className="app-body">
                  <Page>
                    <Header
                      logo={Logo}
                      toggleSidebar={this.toggleSideCollapse}
                      isSidebarCollapsed={sidebarCollapsed}
                      routes={routes}
                      {...this.props}
                    />

                    <PageContent>
                      <Switch history={this.customHistory}>
                        {routes.map((page, key) => (
                          <PrivateRoute path={page.path} component={page.component} key={key} />
                        ))}
                      </Switch>
                    </PageContent>
                  </Page>
                </div>
                <Footer />
              </div>
            </ContextProviders>
          </FormProvider>
        </MyProvider>
      </GAppProvider>
    );
  }
}
