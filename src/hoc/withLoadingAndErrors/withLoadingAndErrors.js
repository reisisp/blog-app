import Spinner from '../../components/UI/Spinner';
import { SmallSpinner } from '../../components/UI/SmallSpinner/SmallSpinner';

import classes from './withLoadingAndErrors.module.scss';

export const withLoadingAndErrors =
  (Component, spinnerSize = 'normal', wrapperSize = 'small') =>
  ({ loading, err, ...props }) =>
    (
      <div className={wrapperSize === 'small' ? classes.wrapper : classes.wrapper_normal}>
        {!err && <Component {...props} err={err} loading={loading} />}
        {loading && (
          <div className={wrapperSize === 'small' ? classes.loading : classes.loading__normal}>
            {spinnerSize === 'small' ? <SmallSpinner /> : <Spinner />}
          </div>
        )}
        {err && <h2>Smth wrong with connection. Repeat later</h2>}
      </div>
    );
