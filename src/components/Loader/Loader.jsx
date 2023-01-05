import { RotatingTriangles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="Wrapper-Loader">
      <RotatingTriangles
        visible={true}
        height="400"
        width="400"
        ariaLabel="rotating-triangels-loading"
        wrapperClass="rotating-triangels-wrapper"
        colors={['#1B5299', '#EF8354', '#DB5461']}
      />
    </div>
  );
};
