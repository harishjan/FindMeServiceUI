import { useDispatch, useSelector } from "react-redux";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';

  
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info('swipe action triggered')}>
        I am Available
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        Work Confirmed
      </SwipeAction>
    </TrailingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        Work Confirmed
      </SwipeAction>
    </TrailingActions>
  );

  export default WorkInquiryList=()=>{
    const { isLoggedIn } = useSelector(state => state.auth);
    if (isLoggedIn) {
        return <Navigate to="/home" />;
     }
     return(
         <>
            <SwipeableList>
                <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
                >
                
                </SwipeableListItem>
            </SwipeableList>
        </>
        );
  }