import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// import custom components
import ContainerColSec from '../components/layout/ContainerColSec';
import FollowCardList from '../components/user/FollowCardList';
import TweetLists from '../components/user/TweetsLists';
import TweetCardForm from '../components/forms/TweetCardForm';
import { HeaderMain } from '../components/basic/Header';

import { getTweets, likeTweet, unlikeTweet, createTweet } from '../api/twitter';

import { getUserInfo } from '../api/userinfo';
import { useAuth } from '../components/context/AuthContext';
import ModalReply from '../components/basic/ModalReply';
import ModalTweet from '../components/basic/ModalTweet';

const MainPage = ({ setModalTweetOpen }) => {
  const [tweets, setTweets] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isTweetSending, setIsTweetSending] = useState(false);

  const {
    isAuthentic,
    member,
    modalReplyOpen,
    modalTweetOpen,
    handleChangeLikeMode,
    like,
  } = useAuth(); // 取出需要的狀態與方法
  const [isTweetsLoaded, setIsTweetsLoaded] = useState(false); // 用來防止tweets-loop產生

  const handleClickCard = ({ userId }) => {
    userId === profile.id
      ? navigate(`/user/${userId}`)
      : userId !== undefined && navigate(`/other/${userId}`);
  };

  //@ 初始呼叫 /api/tweets

  //@ 初始呼叫 /api/tweets
  const getTweetsAsync = async () => {
    setIsLoading(true);
    try {
      const data = await getTweets();
      setTweets(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsTweetsLoaded(true); // 标记为已加载，以防止无限加载
      setIsLoading(false);
    }
  };

  // @ 新增tweet /api/tweets
  const handleAddTweets = async (data) => {
    setIsTweetSending(true);
    try {
      const addData = await createTweet({
        UserId: member.id,
        description: data.description,
      });
      console.log(addData);
      setIsTweetSending(false);

      //@ 再呼叫一次
      getTweetsAsync();
    } catch (error) {
      console.log(`[createData failed]`, error);
      setIsTweetSending(false);
    }
  };

  // @ 呼叫 使用者資料 /api/users
  useEffect(() => {
    const getUserInfoAsync = async () => {
      setIsUserLoading(true);
      try {
        const data = await getUserInfo(member.id);
        setProfile(data);
        setIsUserLoading(false);
      } catch (error) {
        console.error('[getUser Info  with Async failed]', error);
        setIsUserLoading(false);
      }
    };
    getUserInfoAsync();
  }, []);

  // @頁面首次載入 /api/tweets
  useEffect(() => {
    setIsLoading(true);
  }, []);
  //減少函示產生
  // @ like , modalTweetOpen 也觸發渲染讀取新資料
  useEffect(() => {
    getTweetsAsync();
  }, [like, modalTweetOpen]);

  //@ 這一頁的驗證身份放最上面,currentMember好像比較不會出錯
  useEffect(() => {
    if (!isAuthentic) {
      navigate('/login');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  // console.log('testData', testData);
  return (
    <>
      <ContainerColSec
        role='user'
        // setModalTweetOpen={setModalTweetOpen}
        pageIndex={0}
        memberId={member.id}
      >
        {modalTweetOpen && <ModalTweet />}
        {modalReplyOpen && <ModalReply />}
        <section className='section-outer-m col-7'>
          <div className='section-main-m '>
            <HeaderMain pageTitle='首頁' />
            <div className='tweet-form-wrapper'>
              <TweetCardForm
                {...profile}
                onAddTweet={handleAddTweets}
                setTweets={setTweets}
                tweets={tweets}
                isUserLoading={isUserLoading}
                isTweetSending={isTweetSending}
              />
            </div>

            <TweetLists
              tweets={tweets}
              onClick={handleClickCard}
              setIsTweetsLoaded={setIsTweetsLoaded}
              onToggleLike={handleChangeLikeMode}
              isLoading={isLoading}
            />
          </div>
        </section>
        <section className='section-right col-3'>
          <FollowCardList setPathId={() => {}} />
        </section>
      </ContainerColSec>
    </>
  );
};

export default MainPage;
