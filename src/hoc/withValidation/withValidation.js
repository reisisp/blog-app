import classes from './withValidation.module.scss';

export const withValidation =
  (Component) =>
  ({ err, ...props }) =>
    (
      <div>
        <Component {...props} err={err} />
        {err && (
          <div className={classes.elem__err}>
            <div className={classes.err__text}>{err}</div>
          </div>
        )}
      </div>
    );
