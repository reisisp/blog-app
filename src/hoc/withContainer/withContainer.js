import classes from './withContainer.module.scss';

export const withContainer =
  (Component, containerSize = 'normal') =>
  ({ ...props }) =>
    (
      <div className={containerSize === 'normal' ? classes.container : classes.container_small}>
        <Component {...props} />
      </div>
    );
