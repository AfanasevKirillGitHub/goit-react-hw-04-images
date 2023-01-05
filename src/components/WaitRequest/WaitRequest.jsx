import { Watch } from 'react-loader-spinner';

export const WaitRequest = () => {
  return (
    <div className="Wrapper">
      <h2>Please enter your request</h2>
      <Watch
        height="200"
        width="200"
        radius="48"
        color="#000000"
        ariaLabel="watch-loading"
        visible={true}
      />
    </div>
  );
};
