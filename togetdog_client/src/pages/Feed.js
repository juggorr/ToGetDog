import axios from 'axios';
import { useEffect, useState } from 'react';
import FeedProfile from '../components/FeedProfile';
import MenuModal from '../components/MenuModal';
import { BACKEND_URL, DUMMY_URL } from '../config';
import { FeedContainer, FeedPhoto, FeedPhotoWrapper, FeedProfileWrapper } from '../styles/FeedEmotion';

const Feed = () => {
  const menuLists = [
    {
      menu_id: 1,
      text: '내 정보 보기',
      link: '/',
    },
    {
      menu_id: 2,
      text: '프로필 수정',
      link: '/',
    },
    {
      menu_id: 3,
      text: '강아지 프로필 수정',
      link: '/',
    },
    {
      menu_id: 4,
      text: '강아지 프로필 삭제',
      link: '/',
    },
    {
      menu_id: 5,
      text: '계정 비밀번호 변경',
      link: '/',
    },
    {
      menu_id: 6,
      text: '로그아웃',
      link: '/logout',
    },
  ];

  const [menuBtnClick, setMenuBtnClick] = useState(false);

  const getFeedData = async () => {
    await axios
      .get(
        `${DUMMY_URL}/feed`,
        { params: { pageNo: 1 } },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        return resp.data;
      })
      .catch((err) => {
        console.log('피드 데이터 불러오기 실패');
      });
  };

  let feedData = {};
  let feedProfileData = {};
  let feedPhotoData = {};
  useEffect(() => {
    feedData = getFeedData(); // 처음 렌더링 할 때만 Feed 데이터 받아오기
    feedProfileData = feedData.user;
    feedPhotoData = feedData.feed;
  }, []);

  return (
    <>
      <FeedContainer>
        <MenuModal menuLists={menuLists} menuBtnClick={menuBtnClick} setMenuBtnClick={setMenuBtnClick} />
        <FeedProfileWrapper>
          <FeedProfile menuBtnClick={menuBtnClick} setMenuBtnClick={setMenuBtnClick} data={feedProfileData} />
        </FeedProfileWrapper>
        <FeedPhotoWrapper>
          <FeedPhoto src='https://mblogthumb-phinf.pstatic.net/MjAxODA0MTVfMjY2/MDAxNTIzNzgzNTMyMTk5.XluZh00E4Hzkl1Oif19d5UPPXJqzFisXFa_3BT6sTJgg.dOueWfo5LscEpJSYAi56N7p91H_PJLM4IjOvVSexYzYg.JPEG.jjingjjing92/20180410_215717.jpg?type=w800' />
          <FeedPhoto src='https://mypetlife.co.kr/9989/kakaotalk_20180720_165306084/' />
          <FeedPhoto src='https://t1.daumcdn.net/cfile/tistory/9952D14D5ACEAB8831' />
          <FeedPhoto src='https://cdn.imweb.me/thumbnail/20220105/8042079a902c2.jpg' />
          <FeedPhoto src='https://cdn.imweb.me/thumbnail/20210512/392868a89e970.jpg' />
          <FeedPhoto src='https://www.zooseyo.com/dog_sale/photo_free/202212/1671631945_03712600.jpg' />
          <FeedPhoto src='https://joubebe.com/wys2/swf_upload/2017/09/27/15064845361006.png' />
          <FeedPhoto src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLeBn4MEtb_AqR0cj2JjQIFicoJy-tZLBdA&usqp=CAU' />
          <FeedPhoto src='https://cdn.imweb.me/upload/S201806265b31e9f9b9a03/59074608a6b12.jpg' />
          <FeedPhoto src='https://mblogthumb-phinf.pstatic.net/MjAxODA0MTVfMjY2/MDAxNTIzNzgzNTMyMTk5.XluZh00E4Hzkl1Oif19d5UPPXJqzFisXFa_3BT6sTJgg.dOueWfo5LscEpJSYAi56N7p91H_PJLM4IjOvVSexYzYg.JPEG.jjingjjing92/20180410_215717.jpg?type=w800' />
          <FeedPhoto src='https://mypetlife.co.kr/9989/kakaotalk_20180720_165306084/' />
          <FeedPhoto src='https://t1.daumcdn.net/cfile/tistory/9952D14D5ACEAB8831' />
          <FeedPhoto src='https://cdn.imweb.me/thumbnail/20220105/8042079a902c2.jpg' />
          <FeedPhoto src='https://cdn.imweb.me/thumbnail/20210512/392868a89e970.jpg' />
          <FeedPhoto src='https://www.zooseyo.com/dog_sale/photo_free/202212/1671631945_03712600.jpg' />
          <FeedPhoto src='https://joubebe.com/wys2/swf_upload/2017/09/27/15064845361006.png' />
          <FeedPhoto src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLeBn4MEtb_AqR0cj2JjQIFicoJy-tZLBdA&usqp=CAU' />
          <FeedPhoto src='https://cdn.imweb.me/upload/S201806265b31e9f9b9a03/59074608a6b12.jpg' />
        </FeedPhotoWrapper>
      </FeedContainer>
    </>
  );
};

export default Feed;
