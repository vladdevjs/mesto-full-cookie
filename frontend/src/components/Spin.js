import BeatLoader from 'react-spinners/BeatLoader';

function Spin() {
  return (
    <div className='spinner'>
      <BeatLoader color={'#ffffff'} aria-label='Спиннер загрузки' />
    </div>
  );
}

export default Spin;
