import React from 'react';
// import AjaxService from '../../service/AjaxService';
// import autoBind from 'class-autobind';
import { Link } from 'react-router-dom';
// 
// import {t} from '../../helpers/constants/lang';
// import { setService, setServices } from '../../redux/services/actions';
// import { setSingleFilter, setMultiFilter } from '../../redux/filter/actions';
// import {open, close} from '../../redux/sidebar/actions';
// import {selectTicket, setStreamConfiguration} from '../../redux/general/actions';
// import NavAction from './components/NavAction';
// import Response from '../../entities/Response';
// import { Dispatch, AnyAction } from 'redux';
// import { Select } from '../../base/Select';
// import { IGlobalStateRecord } from '../../types/global';
// import { ISideBar } from '../../redux/sidebar/types';
// import { IStorage } from '../../redux/storage/types';
// import { IUser } from '../../redux/user/types';
// import { IServices } from '../../redux/services/types';
// import { IFilter } from '../../redux/filter/types';
// import Service from '../../entities/Service';
// import Incident from '../../entities/Incident';
// const { connect } = require('react-redux');
// const Auth0Instance = require('../../helpers/authentication/auth0');
// require('./style.scss');
import './style.css';

// interface ISideBarStateProps {
//   sidebar: ISideBar;
//   storage: IStorage;
//   user: IUser;
//   services: IServices;
//   filter: IFilter;
//   router: any;
// }
// interface ISideBarDispatchProps {
//   close(): void;
//   open(): void;
//   setServices(services: Service[]): void;
//   setService(service: Service): void;
//   setSingleFilter(key, value): void;
//   setMultiFilter(filter): void;
//   selectTicket(incident: any): void;
//   setStreamConfiguration(streamConfiguration: any): void;
// }
// interface IProps extends ISideBarStateProps, ISideBarDispatchProps {
//   location: string;
//   history: any;
// }

export class SideBar extends React.Component {
  constructor(props) {
    super(props);
    // autoBind(this);
    this.state = {
      expand: false,
      minimize: true,
    //   sidebarState: props.sidebar.open || localStorage.getItem('sidebar') === 'true' ? NAV_STATE.PIN_EXPAND : NAV_STATE.MINI,
    //   sidebarLock: props.sidebar.open || localStorage.getItem('sidebar') === 'true',
      excludedUrls: ['/sign-up', '/sign-in', '/reset-password'],
      navigation: [
        {link: 'dashboard', url: '/dashboard', title: 'Dashboard'},
        {link: 'incidents', url: '/incidents', title: 'Incidents'},
        // {link: 'assets', url: '/assets', title: 'Assets', show: props.storage.featureFlags.vehiclesTab},
        // {link: 'analytics', url: '/analytics', title: 'Analytics', show: props.storage.featureFlags.detection},
        // {link: 'policies', url: '/policies', title: 'Policies', show: props.storage.featureFlags.detection},
        // {link: 'profiles', url: '/profiles', title: 'Profiles', show: props.storage.featureFlags.detection},
        // {link: 'autothreat', url: '/autothreat', title: 'Autothreat', show: props.storage.featureFlags.autoThreat},

      ],
      adminNavigation: [
        // {link: 'learn', url: '/learn', title: 'Learn'},
      ],
    };
  }

//   componentDidMount() {
//     const {storage} = this.props;
//     if (storage.auth0expiresAt && new Date().getTime() < storage.auth0expiresAt) {
//       this.getServices();
//       this.getStreamConfiguration();
//     }
//     this.setState({Auth0: Auth0Instance.default.getInstance()});
//   }

  link(url) {
    // const {selectTicket} = this.props;
    // selectTicket({});
    // this.props.history.push(url);
  }

//   private getStreamConfiguration(): void {
//     const {setStreamConfiguration} = this.props;
//     AjaxService.get('violations/stream/configuration').then((response: Response) => {
//       setStreamConfiguration(response.data);
//     });
//   }
//   private getServices(): void {
//     const {setServices, setService, setSingleFilter, services} = this.props;
//     AjaxService.get('services').then((response) => {
//       setServices(response.data);
//       const lastServiceId = parseInt(localStorage.getItem(LOCAL_VARIABLES.LAST_SERVICE_ID), 0);
//       const service = response.data.find((s) => s.id === lastServiceId);
//       if (services.ids.indexOf(lastServiceId) !== -1) {
//         setService(service);
//         setSingleFilter('serviceId', lastServiceId);
//       } else {
//         setService(response.data[0]);
//         setSingleFilter('serviceId', parseInt(response.data[0].id, 0));
//         localStorage.setItem(LOCAL_VARIABLES.LAST_SERVICE_ID, response.data[0].id);
//       }
//     });
//   }

//   private handleService(selectVal: any): void {
//     const {setSingleFilter, setService, services} = this.props;
//     let service: Service = new Service({});
//     for (const i in services.all) {
//       if (services.all[i].name === selectVal.value) {
//         service = services.all[i];
//       }
//     }
//     setService(service);
//     setSingleFilter('serviceId', service.id);
//     localStorage.setItem(LOCAL_VARIABLES.LAST_SERVICE_ID, service.id.toString());
//     this.props.history.push('/dashboard');

//   }

//   private logOut(): void {
//     this.state.Auth0.logout(this.props.storage.tenantName);
//   }

//   private openSideBar(sidebarState: string): void {
//     if (!this.state.sidebarLock) {
//       this.setState({sidebarState});
//     }
//   }

//   private toggleLock() {
//     const {close, open} = this.props;
//     if (this.state.sidebarLock) {
//       close();
//       this.setState({sidebarState: NAV_STATE.MINI, sidebarLock: false});
//       localStorage.setItem('sidebar', 'false');
//     } else {
//       open();
//       this.setState({sidebarState: NAV_STATE.PIN_EXPAND, sidebarLock: true});
//       localStorage.setItem('sidebar', 'true');
//     }

  render() {
    const {navigation, excludedUrls, sidebarState, adminNavigation} = this.state;
    const {user, services, filter, history, storage} = this.props;
    return (
      <div 
      // className={`sidebar ${excludedUrls.indexOf(history.location.pathname) !== -1 ? 'display-none' : ''} ${sidebarState}`}
        //    onMouseOver={this.openSideBar.bind(this, NAV_STATE.EXPAND)}
        //    onMouseOut={this.openSideBar.bind(this, NAV_STATE.MINI)}
           >
        <div className="logo_holder" >
          {/* <span className={`logo ${sidebarState}`} /> */}
          <a key="nav" className={`col s12 nav_separator`}/>
        </div>
        {/* {storage && storage.featureFlags && storage.featureFlags.detection &&
        // <div className="filter-services">
        //   {services.allNames.length > 0 && filter && filter.serviceId &&
        //   <Select values={services.allNames} id={'topservices'} onchange={this.handleService} selected={services.servicesObj[filter.serviceId]} />
        //   }
        // </div>
        } */}
        <div className={`row nav-body .up-nav`}>
          <div className="row up-nav">
            {navigation.map((nav) => {
            //   if (nav.type && nav.type === 'nav_separator') {
            //     return (<a key="nav" className="col s12 nav_separator"/>);
            //   } else {
                // if (nav.show && nav.title.toLowerCase() !== t.autothreat) {
                if (true) {
                    return (
                  <Link
                    key={nav.link}
                    className={`col s12 ${nav.link}}`}
                    to={nav.url} onClick={this.link.bind(this, nav.url)}
                  >
                    <span className={`icon ${nav.link}`} />
                    <span className={`names ${sidebarState}`}>{nav.link.toLowerCase()}</span>
                  </Link>
                 );
               } else { return ''; }
            //   }
            })
            }
            {/* {storage && storage.featureFlags && storage.featureFlags.autoThreat  &&
            <div className={`autothreat-link ${!storage.featureFlags.detection ? 'only-autothreat' : ''}`}>
              <a className="col s12 border"/>
              <Link
                className={`col s12 autothreat ${history.location.pathname === '/autothreat' ? 'selected' : ''}`}
                to={'/autothreat'} onClick={this.link.bind(this, '/autothreat')}
              >
                <span className={`icon autothreat`} />
                {/*<span className={`names ${sidebarState}`}>{t.autothreat}</span>*/}
              {/* </Link>
              <a className="col s12 border"/>
            </div>} */} 
          </div>
          <div className="row bottom-nav">
            {/* <NavAction action={this.toggleLock}
                       param={sidebarState}
                       stateClass={sidebarState} title={sidebarState === 'pin-expand' ? 'dsd' : 'helo'}
                       iconClass={sidebarState} />
            <NavAction action={this.logOut} stateClass={sidebarState} title={'log out'} iconClass="logout"/> */}
            <a key="nav" className="col s12 nav_separator"/>
          </div>
          <div className={`sidebar-profile cursor-pointer ${sidebarState}`} onClick={this.link.bind(this, '/account')}>
            {/* <div className="display-inline-block"><img className="profile-img" src={user.picture}/></div> */}
            <div className={`holder ${sidebarState}`}>
              <div className="profile-name">{'tehila'}</div>
              <div className="user-title">{'admin'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state: IGlobalStateRecord): ISideBarStateProps => ({
//   sidebar: state.sidebar,
//   filter: state.filter,
//   storage: state.storage,
//   user: state.user,
//   services: state.services,
//   router: state.router,
// });

// const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ISideBarDispatchProps => ({
//   close: () => {dispatch(close()); },
//   open: () => {dispatch(open()); },
//   setServices: (services: Service[]) => {dispatch(setServices(services)); },
//   setService: (service: Service) => {dispatch(setService(service)); },
//   selectTicket: (incident: Incident) => {dispatch(selectTicket(incident)); },
//   setStreamConfiguration: (streamConfiguration: any) => {dispatch(setStreamConfiguration(streamConfiguration)); },
//   setSingleFilter: (key, value) => {dispatch(setSingleFilter(key, value)); },
//   setMultiFilter: (filter) => {dispatch(setMultiFilter(filter)); },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

export default SideBar;
