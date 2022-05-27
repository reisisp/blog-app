import classes from './withShadowBox.module.scss';

export const withShadowBox =
  (Component) =>
  ({ ...props }) =>
    (
      <div className={classes.shadowBox}>
        <Component {...props} />
      </div>
    );
