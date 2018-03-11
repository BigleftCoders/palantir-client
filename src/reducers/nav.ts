import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../root';

// constants
import { LOGIN, LOGOUT } from '../constants/Auth';

// actions
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');

const initialNavState = AppNavigator.router.getStateForAction(secondAction, tempNavState);

function nav(state = initialNavState, action: any) {
  let nextState;

  switch (action.type) {
    case LOGIN:
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    case LOGOUT:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
    default:
      return AppNavigator.router.getStateForAction(action, state) || state;
  }
}

export default nav;
