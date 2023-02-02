import { FeedProfileTop, FeedProfileBottom, MainDogImg } from '../styles/FeedEmotion';

import Girl from '../assets/girl.png';
import MenuIcon from '../assets/menu_icon.png';
import OrangeCharacterBtn from './OrangeCharacterBtn';
import YellowCharacterBtn from './YellowCharacterBtn';

const FeedProfile = ({ menuBtnClick, setMenuBtnClick }) => {
  return (
    <>
      {/* 프로필 상단 */}
      <FeedProfileTop>
        <MainDogImg src='https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDhfMTQ2/MDAxNTU3MzAxNzQ4NDIw.MWkemnXiB57Tbm2kNMrDNj4uVImaujgUayV8GSKWA9Mg._lcDUVLNrYzYR9M36qGCdD1Kp0qLNxoZaqqkj-5-tswg.JPEG.hellohappypet/1.jpg?type=w800'></MainDogImg>
        <div className='dog-info-box'>
          <div>뽀삐</div>
          <div className='dog-info'>
            폼피츠 / 4살
            <img src={Girl} className='dog-gender' />
          </div>
        </div>
        <div className='profile-etc-wrapper'>
          <img src={MenuIcon} className='menu-icon' onClick={() => setMenuBtnClick(true)} />
          <div className='follow-info flex-column'>
            <div>
              <span className='follow-text'>팔로워</span>132
            </div>
            <div>
              <span className='follow-text'>팔로잉</span>128
            </div>
          </div>
        </div>
      </FeedProfileTop>
      {/* 특이사항, 성격 들어가는 부분 */}
      <FeedProfileBottom>
        <div className='special-text'>개를 보면 흥분해요</div>
        <div className='characters-box'>
          <OrangeCharacterBtn text={'#중성화'} />
          <YellowCharacterBtn text={'#독립적'} />
          <YellowCharacterBtn text={'#활동적'} />
        </div>
      </FeedProfileBottom>
    </>
  );
};

export default FeedProfile;
