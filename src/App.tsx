import React, { useEffect } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import { ACCESS_TOKEN, UUID } from "./constants/constants";
import { routes } from "./constants/routes";
import MainLayout from "./layout/MainLayout";
import LoadingIcon from "./modules/common/LoadingIcon";
import Login from "./modules/login/Login";
import { AppState } from "./modules/rootReducer";
import NotFound from "./modules/system/NotFound";
import { isEmpty } from "./utils/helpers/helpers";

function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const goToLogin = () => props?.history?.push(routes.LOGIN);
  const fetchDeviceId = async () => {
    if (isEmpty(localStorage.getItem(UUID))) {
      localStorage.setItem(UUID, uuidv4());
    }
    if (localStorage.getItem(ACCESS_TOKEN)) {
      // fetchEmployeesInfo();
    } else {
      goToLogin();
    }
  };
  useEffect(() => {
    fetchDeviceId(); //eslint-disable-next-line
  }, []);

  return (
    <>
      <React.Suspense fallback={<LoadingIcon />}>
        <Switch>
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.NOT_FOUND} component={NotFound} />
          {/* <ProtectedRoute path={"*"} component={MainLayout} /> */}

          {localStorage.getItem(ACCESS_TOKEN) && (
            <Route path={"*"} component={MainLayout} />
          )}
        </Switch>
      </React.Suspense>
    </>
  );
};

export default connect(mapStateToProps)(withRouter(App));
