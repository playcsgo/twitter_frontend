import React from 'react';
import { Link, useParams } from 'react-router-dom';

import UserAvatar from './UserAvatar';
import UserBk from './UserBk';
import { useAuth } from '../../components/context/AuthContext';

// import svg
// @ testing local photo
// import testAvatar from '../../assets/images/avatar1.jpg';
// import iconMessage from '../../assets/images/icon/message.svg';
// import iconNotice from '../../assets/images/icon/notice.svg';

//@ testing http photos
// const testBk =
//   'https://images.unsplash.com/photo-1497290756760-23ac55edf36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80';

const ProfileCard = ({
  name,
  account,
  introduction,
  avatar,
  banner,
  followersCount,
  followingsCount,
  imageStatus,
  isLoading,
}) => {
  const { setModalProOpen } = useAuth();
  const userId = Number(useParams().id);
  return (
    <>
      <div className='profile-card'>
        <UserBk
          bkUrl={banner}
          isLoading={isLoading}
          imageStatus={imageStatus}
        />
        <UserAvatar
          avatar={avatar}
          isLoading={isLoading}
          imageStatus={imageStatus}
        />
        <div className='profile-btn-group'>
          <button
            className='button-md button-m'
            onClick={() => setModalProOpen(true)}
          >
            編輯個人資料
          </button>
        </div>
        <div className='profile-info'>
          <h5 className='user-name'>{name}</h5>
          <p className='user-account'>{account && `@${account}`}</p>
          <p className='user-desc'>{introduction}</p>
        </div>
        <div className='user-follow-info'>
          <Link to={`/user/followers/${userId}`} state={{ tabIndex: '1' }}>
            <p>
              {followingsCount} 個 <span>跟隨中</span>
            </p>
          </Link>

          <Link to={`/user/followers/${userId}`} state={{ tabIndex: '0' }}>
            <p>
              {followersCount} 位<span>跟隨者</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
