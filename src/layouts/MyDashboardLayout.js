import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header, MySidebarNav, Footer, PageContent, Page } from '../vibe';
import nav from '../navs';
import routes from '../routes';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import MyProvider from '../context/MyContext';


const MOBILE_SIZE = 992;

export default class MyDashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
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
      this.toggleSideCollapse();
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
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };
  

  
 

  render() {

 

  
    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <MyProvider>
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
        
          <div className="app-body">
            <MySidebarNav
              nav={nav}
              logo={null}
              logoText=""
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              {...this.props}
            />
            <Page>
              <Header 
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                routes={routes}
                {...this.props}
              >
                
              </Header>
              <PageContent>


                
                
                
                <Switch>
                  {routes.map((page, key) => (
                    <Route path={page.path} component={page.component} key={key} />
                  ))}

                  <Redirect from="/gestor" to="/gestor/buscador/noticias" />
                 </Switch>
              </PageContent>
            </Page>
          </div>
          <Footer>
         
           
          </Footer>
        
        </div>
      </ContextProviders>
      </MyProvider>
    );
  }
}

